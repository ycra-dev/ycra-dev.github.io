// 빌드 타임 PlantUML 렌더링 remark 플러그인.
// ```plantuml / ```puml 코드펜스를 java -jar plantuml.jar 로 SVG 렌더링해 정적 임베드한다.
// .md / .mdx 모두에 적용된다. (jar는 scripts/fetch-plantuml.mjs(prebuild)가 준비)
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const JAR = resolve('.cache/plantuml.jar');
const LANGS = new Set(['plantuml', 'puml', 'uml']);

let warnedMissingJar = false;
let warnedMissingJava = false;

/** 코드 → SVG 문자열 (실패 시 null) */
function renderToSvg(code) {
	if (!existsSync(JAR)) {
		if (!warnedMissingJar) {
			console.warn('[remark-plantuml] .cache/plantuml.jar 없음 — `npm run build`(prebuild)로 받아주세요. 코드블록 유지.');
			warnedMissingJar = true;
		}
		return null;
	}
	// @startuml 래퍼가 없으면 자동으로 감싼다.
	const src = /@start\w+/.test(code) ? code : `@startuml\n${code}\n@enduml`;
	const res = spawnSync(
		'java',
		['-Djava.awt.headless=true', '-jar', JAR, '-tsvg', '-pipe', '-charset', 'UTF-8'],
		{ input: src, maxBuffer: 64 * 1024 * 1024 },
	);
	if (res.error) {
		if (res.error.code === 'ENOENT' && !warnedMissingJava) {
			console.warn('[remark-plantuml] java 실행 불가 — JDK 설치 필요. 코드블록 유지.');
			warnedMissingJava = true;
		}
		return null;
	}
	if (res.status !== 0) {
		console.warn(`[remark-plantuml] 렌더 실패:\n${res.stderr?.toString().slice(0, 500)}`);
		return null;
	}
	let svg = res.stdout.toString('utf8');
	// 첫 SVG 엘리먼트만 사용하고 XML 선언/DOCTYPE 제거
	svg = svg.replace(/<\?xml[\s\S]*?\?>/i, '').replace(/<!DOCTYPE[\s\S]*?>/i, '').trim();
	return svg || null;
}

/** 트리를 순회하며 code 노드를 html 노드로 치환 */
function transform(node) {
	if (!node || !Array.isArray(node.children)) return;
	for (let i = 0; i < node.children.length; i++) {
		const child = node.children[i];
		if (child.type === 'code' && child.lang && LANGS.has(child.lang.toLowerCase())) {
			const svg = renderToSvg(child.value);
			if (svg) {
				node.children[i] = {
					type: 'html',
					value: `<figure class="plantuml-diagram not-content">${svg}</figure>`,
				};
			}
			continue;
		}
		transform(child);
	}
}

export default function remarkPlantuml() {
	return (tree) => transform(tree);
}

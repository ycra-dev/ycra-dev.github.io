// PlantUML jar를 빌드 타임 렌더링용으로 .cache/에 내려받는다.
// 이미 존재하면 건너뛴다. CI(prebuild)·로컬 모두에서 동일하게 동작.
import { existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const VERSION = '1.2026.6';
const URL = `https://github.com/plantuml/plantuml/releases/download/v${VERSION}/plantuml-${VERSION}.jar`;
const OUT = resolve('.cache/plantuml.jar');

async function main() {
	if (existsSync(OUT) && statSync(OUT).size > 1_000_000) {
		console.log(`[plantuml] jar 캐시 존재 (${OUT}) — 다운로드 생략`);
		return;
	}
	mkdirSync(dirname(OUT), { recursive: true });
	console.log(`[plantuml] 다운로드 중: ${URL}`);
	const res = await fetch(URL, { redirect: 'follow' });
	if (!res.ok) throw new Error(`PlantUML jar 다운로드 실패: HTTP ${res.status}`);
	const buf = Buffer.from(await res.arrayBuffer());
	if (buf.length < 1_000_000) throw new Error(`다운로드된 jar가 너무 작음 (${buf.length} bytes)`);
	writeFileSync(OUT, buf);
	console.log(`[plantuml] 저장 완료: ${OUT} (${(buf.length / 1e6).toFixed(1)} MB)`);
}

main().catch((err) => {
	console.error(`[plantuml] ${err.message}`);
	process.exit(1);
});

// @ts-check
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://ycra-dev.github.io',
	integrations: [
		mermaid(),
		starlight({
			title: 'ycra.dev',
			defaultLocale: 'root',
			locales: {
				root: { label: '한국어', lang: 'ko' },
			},
			customCss: [
				'./node_modules/katex/dist/katex.min.css',
				'./src/styles/custom.css',
			],
			components: {
				Header: './src/components/Header.astro',
				Sidebar: './src/components/Sidebar.astro',
				PageTitle: './src/components/PageTitle.astro',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/ycra-dev' },
				{ icon: 'rss', label: 'RSS', href: '/rss.xml' },
			],
			sidebar: [
				{
					label: 'Blog',
					collapsed: true,
					items: [
						{ slug: 'blog' },
						{ label: '회고', collapsed: true, autogenerate: { directory: 'blog/retrospective' } },
					],
				},
				{
					label: 'Knowledge',
					collapsed: true,
					items: [
						{ slug: 'knowledge' },
						// { label: 'Database', collapsed: true, autogenerate: { directory: 'knowledge/database' } },
						// { label: 'Language', collapsed: true, autogenerate: { directory: 'knowledge/language' } },
						{
							label: 'Network',
							collapsed: true,
							autogenerate: { directory: 'knowledge/network' },
						},
						{
							label: 'OS',
							collapsed: true,
							items: [
								{ slug: 'knowledge/os' },
								{ label: '기본 개념', collapsed: true, autogenerate: { directory: 'knowledge/os/basics' } },
								{ label: '프로세스와 스레드', collapsed: true, autogenerate: { directory: 'knowledge/os/process' } },
								{ label: 'CPU 스케줄링', collapsed: true, autogenerate: { directory: 'knowledge/os/scheduling' } },
								{ label: '동기화와 교착 상태', collapsed: true, autogenerate: { directory: 'knowledge/os/synchronization' } },
								{ label: '메모리 관리', collapsed: true, autogenerate: { directory: 'knowledge/os/memory' } },
								{ label: 'I/O 시스템', collapsed: true, autogenerate: { directory: 'knowledge/os/io' } },
								{ label: '저장장치', collapsed: true, autogenerate: { directory: 'knowledge/os/storage' } },
								{ label: '컴퓨터 시스템 구조', collapsed: true, autogenerate: { directory: 'knowledge/os/architecture' } },
								{ label: '분산 시스템', collapsed: true, autogenerate: { directory: 'knowledge/os/distributed' } },
								{ label: '운영체제 서비스', collapsed: true, autogenerate: { directory: 'knowledge/os/services' } },
								{ label: '보호', collapsed: true, autogenerate: { directory: 'knowledge/os/protection' } },
								{ label: '보안', collapsed: true, autogenerate: { directory: 'knowledge/os/security' } },
								{ label: '운영체제 구조', collapsed: true, autogenerate: { directory: 'knowledge/os/structure' } },
							],
						},
					],
				},
				{
					label: 'TIL',
					collapsed: true,
					autogenerate: { directory: 'til' },
				},
			],
		}),
	],
});

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
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/ycra-dev' },
				{ icon: 'rss', label: 'RSS', href: '/rss.xml' },
			],
			sidebar: [
				{
					label: 'Blog',
					collapsed: true,
					autogenerate: { directory: 'blog' },
				},
				{
					label: 'Knowledge',
					collapsed: true,
					items: [
						{ label: 'Database', collapsed: true, autogenerate: { directory: 'knowledge/database' } },
						{ label: 'Language', collapsed: true, autogenerate: { directory: 'knowledge/language' } },
						{ label: 'Network', collapsed: true, autogenerate: { directory: 'knowledge/network' } },
						{
							label: 'OS',
							collapsed: true,
							items: [
								{ slug: 'knowledge/os' },
								{ label: '기본 개념', collapsed: true, autogenerate: { directory: 'knowledge/os/basics' } },
								{ label: '프로세스', collapsed: true, autogenerate: { directory: 'knowledge/os/process' } },
								{ label: 'I/O와 저장장치', collapsed: true, autogenerate: { directory: 'knowledge/os/storage' } },
								{ label: '컴퓨터 시스템 구조', collapsed: true, autogenerate: { directory: 'knowledge/os/architecture' } },
								{ label: '운영체제 서비스', collapsed: true, autogenerate: { directory: 'knowledge/os/services' } },
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

// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://ycra-dev.github.io',
	integrations: [
		starlight({
			title: 'ycra.dev',
			defaultLocale: 'root',
			locales: {
				root: { label: '한국어', lang: 'ko' },
			},
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
					autogenerate: { directory: 'knowledge' },
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

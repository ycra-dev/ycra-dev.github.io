// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';

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
			plugins: [starlightBlog()],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/ycra-dev' },
			],
			sidebar: [
				{
					label: 'TIL',
					autogenerate: { directory: 'til' },
				},
				{
					label: 'Knowledge',
					autogenerate: { directory: 'knowledge' },
				},
			],
		}),
	],
});

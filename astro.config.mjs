// @ts-check
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import resendRouter from 'astro-resend-router';
import { loadEnv } from 'vite';

// For Local Dev, set NGROK_HOST from .env
const { NGROK_HOST, PFI_AUTHORIZED_SENDERS, CST_AUTHORIZED_SENDERS } = loadEnv(
	'',
	process.cwd(),
	'',
);

export default defineConfig({
	site: 'https://prairieforge.org/',
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Bebas Neue',
			cssVariable: '--font-sans',
		},
		{
			provider: fontProviders.google(),
			name: 'Lora',
			cssVariable: '--font-serif',
		},
	],

	vite: {
		plugins: [tailwindcss()],
		server: {
			allowedHosts: [NGROK_HOST],
		},
	},

	adapter: netlify(),
	integrations: [
		sitemap(),
		resendRouter({
			segments: [
				{
					segmentName: 'Prairie Forge Initiative',
					segmentSlug: 'pfi',
					segmentId: 'bd926298-9333-4dc8-86b2-d5c38f396184',
					topics: [
						{
							topicName: 'PFI Newsletter',
							topicSlug: 'newsletter',
							topicId: '81af9034-c0b4-4550-8542-75d90caf68d7',
						},
					],
					allowPublicJoin: true,
					authorizedSenders:
						PFI_AUTHORIZED_SENDERS?.split(',').map((e) => e.trim()) ?? [],
					sendFromEmail: {
						name: 'Prairie Forge',
						email: 'hello@updates.prairieforge.org',
					},
				},
				{
					segmentName: 'Minneapolis CST Workshop',
					segmentSlug: 'cst',
					segmentId: '88f01426-893d-4776-abb8-5247826189e7',
					sendFromEmail: {
						name: 'Minneapolis CST Workshop',
						email: 'hello@updates.prairieforge.org',
					},
					allowPublicJoin: true,
					authorizedSenders:
						CST_AUTHORIZED_SENDERS?.split(',').map((e) => e.trim()) ?? [],
					topics: [
						{
							topicName: 'CST Minneapolis Announcements',
							topicSlug: 'news',
							topicId: 'ce78aed9-15ca-4238-9382-e2bdf6be5dee',
						},
					],
				},
				{
					segmentName: 'Resend TEST Group',
					segmentSlug: 'test',
					segmentId: '358c0735-ad71-4a0f-8971-a3fa1b529dd6',
					sendFromEmail: {
						name: 'RESEND TEST',
						email: 'hello@updates.prairieforge.org',
					},
					allowPublicJoin: true,
					authorizedSenders:
						CST_AUTHORIZED_SENDERS?.split(',').map((e) => e.trim()) ?? [],
				},
			],
		}),
	],
});

import type { PluginAPI } from '@ampcode/plugin'

export const description =
	'Design Lab: generate UI variations, collect feedback, and iterate to a confident design.'

export default async function (amp: PluginAPI) {
	// Bundle the existing skill so its workflow guidance is available as
	// design-and-refine:design-lab.
	await amp.registerSkill({ path: 'skills/design-lab' })

	amp.registerCommand(
		'start',
		{
			title: 'Start Design & Refine',
			category: 'design-and-refine',
			description: 'Generate UI variations, collect feedback, and iterate to the perfect design',
		},
		async (ctx) => {
			if (!ctx.thread) {
				ctx.ui.notify('Start this command from inside a thread.')
				return
			}
			const target = await ctx.ui.input({
				title: 'Design target',
				message: 'Which component or page should be designed/redesign? Leave empty to be asked later.',
			})
			const msg =
				'/design-and-refine start' +
				(target && target.trim() ? ` ${target.trim()}` : '')
			await ctx.thread.appendUserMessage({
				type: 'user-message',
				content: `Use the design-and-refine:design-lab skill to run its full workflow now. Target: ${msg}`,
			})
		},
	)

	amp.registerCommand(
		'cleanup',
		{
			title: 'Cleanup Design Lab Files',
			category: 'design-and-refine',
			description: 'Remove all temporary design lab files created during a session',
		},
		async (ctx) => {
			if (!ctx.thread) {
				ctx.ui.notify('Start this command from inside a thread.')
				return
			}
			await ctx.thread.appendUserMessage({
				type: 'user-message',
				content:
					'Run the design-and-refine cleanup procedure: check for .claude-design/ and temporary __design_lab/__design_preview routes, confirm with me, and delete them.',
			})
		},
	)

	// Equivalent of the Claude Code SessionEnd/Stop hook: warn about leftover
	// files when an agent turn ends.
	amp.on('agent.end', async (event, ctx) => {
		const $ = ctx.$
		const checks = [
			['-d .claude-design', 'Temporary design files found in .claude-design/'],
			['-d app/__design_lab || -d app/__design_preview', 'Temporary route directories found in app/'],
			['-f pages/__design_lab.tsx || -f pages/__design_preview.tsx', 'Temporary route files found in pages/'],
		] as const
		const warnings: string[] = []
		for (const [test, message] of checks) {
			const r = await $`sh -c ${`test ${test} && echo yes || echo no`}`
			if (r.stdout.trim() === 'yes') warnings.push(message)
		}
		if (warnings.length > 0) {
			await ctx.ui.notify(
				'[Design Lab] ' + warnings.join(' ') + ' Run design-and-refine:cleanup to remove them.',
			)
		}
	})
}

export const meta = {
  name: 'hero-warband',
  description: 'Send three scouts to read the last three chambers and report what each one checks',
  phases: [{ title: 'Scout' }],
}

const CHAMBERS = [
  'scripts/lib/hero/levels/level_10.rb',
  'scripts/lib/hero/levels/level_11.rb',
  'scripts/lib/hero/levels/level_12.rb',
]

const reports = await pipeline(
  CHAMBERS,
  path => agent(
    `You are a scout in the Claude Code Hero dungeon. Read ${path}. ` +
    `In two sentences: say what this level's verification checks, and name one way ` +
    `a player could pass it without learning the lesson. Do not modify any files.`,
    { label: `scout:${path.split('/').pop()}`, phase: 'Scout' }
  )
)

log(`${reports.filter(Boolean).length} of ${CHAMBERS.length} scouts returned`)
return reports

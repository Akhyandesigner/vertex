import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

const env = { ...process.env }
const environmentAliases = [
  ['SANITY_STUDIO_PROJECT_ID', 'NEXT_PUBLIC_SANITY_PROJECT_ID'],
  ['SANITY_STUDIO_DATASET', 'NEXT_PUBLIC_SANITY_DATASET'],
  ['SANITY_STUDIO_API_VERSION', 'NEXT_PUBLIC_SANITY_API_VERSION'],
]

for (const [studioName, appName] of environmentAliases) {
  if (!env[studioName] && env[appName]) {
    env[studioName] = env[appName]
  }
}

const result = spawnSync(
  process.execPath,
  [resolve('node_modules/sanity/bin/sanity'), ...process.argv.slice(2)],
  { env, stdio: 'inherit' },
)

if (result.error) {
  throw result.error
}

process.exitCode = result.status ?? 1

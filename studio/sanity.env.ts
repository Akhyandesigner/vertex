function requiredEnv(...names: string[]): string {
  for (const name of names) {
    const value = process.env[name]?.trim()
    if (value) return value
  }

  throw new Error(`Missing Studio setting: ${names.join(' or ')}`)
}

export const projectId = requiredEnv(
  'SANITY_STUDIO_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
)

export const dataset = requiredEnv(
  'SANITY_STUDIO_DATASET',
  'NEXT_PUBLIC_SANITY_DATASET',
)

export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION ||
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  '2026-10-22'

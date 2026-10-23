function required(value: string | undefined, names: string): string {
  const trimmed = value?.trim()
  if (trimmed) return trimmed

  throw new Error(`Missing Studio setting: ${names}`)
}

export const projectId = required(
  process.env.SANITY_STUDIO_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID',
)

export const dataset = required(
  process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET,
  'SANITY_STUDIO_DATASET or NEXT_PUBLIC_SANITY_DATASET',
)

export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION ||
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  '2026-10-22'

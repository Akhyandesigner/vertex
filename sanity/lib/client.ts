import 'server-only'

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

const token = process.env.SANITY_API_READ_TOKEN

if (!token) {
  throw new Error(
    'Missing SANITY_API_READ_TOKEN. Add a private Sanity read token to the server environment.',
  )
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  perspective: 'published',
  useCdn: false,
})

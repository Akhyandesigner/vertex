import { defineField, defineType } from 'sanity'

export const learningOutcome = defineType({
  name: 'learningOutcome',
  title: 'Learning outcome',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon name',
      description: 'A short icon identifier used by the web app.',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
})

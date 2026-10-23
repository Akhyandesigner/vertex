import { defineArrayMember, defineField, defineType } from 'sanity'

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  groups: [
    { name: 'details', title: 'Lesson details', default: true },
    { name: 'notes', title: 'Notes and resources' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required().min(3).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      group: 'details',
      validation: (rule) =>
        rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Poster or thumbnail',
      type: 'image',
      group: 'details',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      group: 'details',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'freePreview',
      title: 'Free preview',
      description: 'Display label only; this field does not control access.',
      type: 'boolean',
      initialValue: false,
      group: 'details',
    }),
    defineField({
      name: 'studentCount',
      title: 'Student count',
      description: 'Display value only; this is not a live enrollment count.',
      type: 'number',
      group: 'details',
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      group: 'notes',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule.required().uri({ scheme: ['http', 'https', 'mailto'] }),
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'keyPoints',
      title: 'Key points',
      type: 'array',
      group: 'details',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'keyPoint',
          fields: [
            defineField({
              name: 'title',
              title: 'Point',
              type: 'string',
              validation: (rule) => rule.required().max(160),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'proTip',
      title: 'Pro tip',
      type: 'text',
      rows: 3,
      group: 'details',
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      group: 'notes',
      of: [defineArrayMember({ type: 'resource' })],
      validation: (rule) => rule.max(20),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'duration',
      media: 'thumbnail',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: typeof subtitle === 'number' ? `${subtitle} min` : undefined,
        media,
      }
    },
  },
})

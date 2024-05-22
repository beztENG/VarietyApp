import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Featured Shops',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Shop Name',
      validation: rule => rule.required()
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
      validation: rule => rule.max(200)
    },
    {
      name: 'shops',
      type: 'array',
      title: 'Shops',
      of: [{type: 'reference', to: [{type: 'shop'}]}]
    },
  ],
})

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Product Name',
      validation: rule => rule.required()
    },
    {
      name: 'description',
      type: 'string',
      title: 'Product description',
      validation: rule => rule.required()
    },
    {
      name: 'image',
      type: 'image',
      title: 'image of the category'
    },
    {
      name: 'price',
      type: 'number',
      title: 'price for the product in USD'
    },
  ],
})

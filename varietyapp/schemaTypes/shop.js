import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shop',
  title: 'Shop',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: rule => rule.required()
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
      validation: rule => rule.max(200),
    },
    {
      name: 'image',
      type: 'image',
      title: 'image of the shop'
    },
    {
      name: 'lat',
      type: 'number',
      title: 'latitude of the shop'
    },
    {
        name: 'lng',
        type: 'number',
        title: 'longtitude of the shop'
    },
    {
        name: 'address',
        type: 'string',
        title: 'Shop address'
    },
    {
        name: 'rating',
        type: 'number',
        title: 'Enter a number between 1 and 5',
        validation: rule => rule.required().min(1).max(5).error('Please enter a value between 1 and 5')
    },
    {
        name: 'reviews',
        type: 'string',
        title: 'Reviews'
    },
    {
        name: 'type',
        title: 'Category',
        validation: rule => rule.required(),
        type: 'reference',
        to: [{type :'category'}]
    },
    {
        name: 'products',
        type: 'array',
        title: 'Products',
        of: [{type: 'reference', to: [{type: 'product'}]}]
    },
  ],
})

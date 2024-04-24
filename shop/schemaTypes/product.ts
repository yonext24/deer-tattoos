import { defineField, defineType } from "sanity";


export default defineType({
  name: "product",
  title: "Product",
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del producto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [{
        type: 'image',
        options: {
          hotspot: true
        }
      }]
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variations',
      title: 'Variaciones (y stock)',
      description: 'Las variaciones del producto, por defecto hay una variación llamada "Principal" con stock 1, click para editar. Si no hay variaciones, deja la variación principal y edita su stock.',
      type: 'array',
      initialValue: [
        {
          name: 'Principal',
          stock: 1
        }
      ],
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'name',
            type: 'string',
            title: 'Nombre',
          }),
          defineField({
            name: 'stock',
            type: 'number',
          })
        ]
      }]
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
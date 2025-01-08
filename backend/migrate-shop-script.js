// const fs = require('fs').promises
// const path = require('path')

// async function copyDirectory(source, destination) {
//   try {
//     await fs.mkdir(destination, { recursive: true })
//     const entries = await fs.readdir(source, { withFileTypes: true })

//     for (let entry of entries) {
//       const sourcePath = path.join(source, entry.name)
//       const destinationPath = path.join(destination, entry.name)

//       if (entry.isDirectory()) {
//         await copyDirectory(sourcePath, destinationPath)
//       } else {
//         await fs.copyFile(sourcePath, destinationPath)
//       }
//     }
//     console.log(`Directory copied from ${source} to ${destination}`)
//   } catch (err) {
//     console.error(`Error copying directory: ${err}`)
//   }
// }

// const sourceDir = 'C:/Users/yonie/dev/deer-tattoos/src/app/api/shop'
// const destinationDir = 'C:/Users/yonie/dev/deer-testing/app/api/shop'

// copyDirectory(sourceDir, destinationDir)

const data = [
  {
    name: 'Realismo',
    variants: ['realism'],
  },
  {
    name: 'Neo-tradicional',
    variants: ['neo-traditional'],
  },
  {
    name: 'Tribal',
    variants: ['tribal'],
  },
  {
    name: 'Acuarela',
    variants: ['watercolor'],
  },
  {
    name: 'Geométrico',
    variants: ['geometric'],
  },
  {
    name: 'Ilustrativo',
    variants: ['illustrative'],
  },
  {
    name: 'Maorí',
    variants: ['maori'],
  },
  {
    name: 'Trash Polka',
    variants: ['trash-polka'],
  },
  {
    name: 'Old School',
    variants: ['old-school'],
  },
  {
    name: 'Lettering o caligrafía',
    variants: ['lettering'],
  },
  {
    name: 'Blackwork',
    variants: ['blackwork'],
  },
  {
    name: 'Biomecánico',
    variants: ['biomechanical'],
  },
  {
    name: 'Minimalista',
    variants: ['minimalist'],
  },
  {
    name: 'Puntillismo',
    variants: ['pointillism'],
  },
  {
    name: 'Escritura a mano',
    variants: ['handwriting'],
  },
  {
    name: 'Etnico o cultural',
    variants: ['ethnic-cultural'],
  },
  {
    name: 'Hiperrealismo',
    variants: ['hyperrealism'],
  },
  {
    name: 'Silueta',
    variants: ['silhouette'],
  },
  {
    name: 'Graffiti',
    variants: ['graffiti'],
  },
  {
    name: 'Fantasía',
    variants: ['fantasy'],
  },
  {
    name: 'Jj',
    variants: ['jj'],
  },
  {
    name: 'Japones',
    variants: ['japanese', 'ponja'],
  },
]

data.forEach(async (style) => {
  await fetch('http://localhost:3000/api/categories', {
    method: 'POST',
    body: JSON.stringify(style),
  })
    .then((res) => {
      if (!res.ok) throw new Error()
      console.log(`El estilo ${style.name} se creó correctamente`)
    })
    .catch((err) => {
      console.error(`El estilo ${style.name} falló al crearse:`)
      console.error(err)
    })
})

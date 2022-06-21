const db = require('./db')
const ProductModel = require('./db').Product

const names = ['Chris', 'Duc', 'Greg', 'Kevin', 'Grace', 'Tortellini']

const prefixes = ['', 'Deluxe ', 'Organic ', 'Special ', 'Supreme ']

const defaultDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus tristique rutrum. Etiam ut quam quis massa ultrices bibendum tempus nec erat. Suspendisse at leo non enim porta semper. Proin aliquet dignissim est eu euismod. Vivamus id purus nulla. Sed et tortor consectetur, sollicitudin velit vel, porttitor urna. Donec ac enim vel eros congue mollis. Aliquam eleifend suscipit mi. Cras scelerisque id mi sit amet iaculis. Nulla facilisi. Vestibulum accumsan lorem nisi, a commodo erat varius in. Donec at elementum sapien. Curabitur felis purus, ultrices ac nunc id, auctor dapibus augue.'

const pastaTypes = ['gluten-free', 'whole-wheat', 'semolina']
const pastaShapes = ['long', 'ribbon', 'tubular', 'shaped', 'stuffed']

class Product {
  constructor({name, description, price, quantity, image, type, shape}) {
    this.name = name
    this.description = description
    this.price = price
    this.quantity = quantity
    this.image = image
    this.type = type
    this.shape = shape
  }
}

function generatePastaNames(prefixArray, namesArray) {
  const pastaNames = []

  namesArray.forEach(n => {
    prefixArray.forEach(p => {
      pastaNames.push(p + 'Pasta ' + n)
    })
  })
  console.log(pastaNames)
  return pastaNames
}

function generateProducts(pastaNameArray) {
  let i = 0

  return pastaNameArray.map(n => {
    const product = new Product({
      name: n,
      description: defaultDescription,
      price: 5.99,
      quantity: 50,
      image: '/images/pasta2.jpg',
      type: pastaTypes[i % pastaTypes.length],
      shape: pastaShapes[i % pastaShapes.length]
    })
    i++
    return product
  })
}

async function seed() {
  const products = generateProducts(generatePastaNames(prefixes, names))

  try {
    await ProductModel.bulkCreate(products)
    console.log('Products Table seeded!')
  } catch (err) {
    console.error('There was an error seeding the Products Table\n', err)
  }
}

seed()

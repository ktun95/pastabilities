import user from '../../store/user'

export const billing = cart => {
  console.log('from billing in utilities', cart)
  const subTotalCent = cart.reduce((total, curVal) => {
    return total + curVal.price * curVal.quantity
  }, 0)
  const taxCent = subTotalCent * 0.07
  const totalCent = subTotalCent + taxCent
  const bill = {
    subTotal: (subTotalCent / 100).toFixed(2),
    tax: (taxCent / 100).toFixed(2),
    total: (totalCent / 100).toFixed(2)
  }
  return bill
}

export const itemPrice = item => {
  const subTotalCent = item.price * item.quantity
  const taxCent = subTotalCent * 0.07
  const totalCent = subTotalCent + taxCent
  const bill = {
    subTotal: (subTotalCent / 100).toFixed(2),
    tax: (taxCent / 100).toFixed(2),
    total: (totalCent / 100).toFixed(2)
  }
  return bill
}

export const mergeCart = (localCart, userCart) => {
  console.log('IS THIS SHIT RUNNING??', localCart, userCart)
  const totalCart = [...localCart, ...userCart]
  const filterCart = totalCart.reduce((accum, currentItem) => {
    const found = accum.find(item => item.id === currentItem.id)
    if (!found) {
      accum.push(currentItem)
      return accum
    } else {
      found.quantity += currentItem.quantity
      return accum
    }
  }, [])

  return filterCart
}

// const cartA = [{id: 1, quantity: 3}, {id: 2, quantity: 3}]
// const cartB = [{id: 2, quantity: 2}, {id: 1, quantity: 2}]

// console.log(mergeCart(cartA, cartB))

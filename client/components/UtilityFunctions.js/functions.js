export const billing = cart => {
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

import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const stripeBtn = () => {
  const publishableKey = 'pk_test_DUbKNX2jBsDxZV2i0McVhWe6'

  const onToken = token => {
    const body = {
      amount: 999,
      token: token
    }
    axios
      .post('http://localhost:8000/payment', body)
      .then(response => {
        console.log(response)
        alert('Payment Success')
      })
      .catch(error => {
        console.log('Payment Error: ', error)
        alert('Payment Error')
      })
  }
  return (
    <StripeCheckout
      label="Order"
      name="Pastabilities" //Modal Header
      description="Pastas heading your way."
      panelLabel="Order"
      amount={999}
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}
export default stripeBtn

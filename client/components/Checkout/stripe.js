import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const stripeBtn = props => {
  const publishableKey = 'pk_test_DUbKNX2jBsDxZV2i0McVhWe6'

  const onToken = token => {
    const body = {
      amount: props.bill.total,
      token: token
    }
    axios
      .post('http://localhost:8000/payment', body)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log('Payment Error: ', error)
      })
  }
  return (
    <StripeCheckout
      label="Order"
      name="Pastabilities"
      description="Pastas heading your way."
      panelLabel="Order"
      amount={props.bill.total}
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}
export default stripeBtn

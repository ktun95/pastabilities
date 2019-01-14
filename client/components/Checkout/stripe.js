import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

class TakeMoney extends React.Component {
  onToken = token => {
    console.log('yo, token')
    //NOT DOING ANYTHING YET
    // fetch('/save-stripe-token', {
    //   method: 'POST',
    //   body: JSON.stringify(token)
    // }).then(response => {
    //   response.json().then(data => {
    //     alert(`We are in business, ${data.email}`)
    //   })
    // })
    this.props.isPaid()
  }
  onClosed = () => {
    console.log('yo, closed')
  }

  render() {
    const publishableKey = 'pk_test_DUbKNX2jBsDxZV2i0McVhWe6'
    console.log(this.props)
    return (
      <StripeCheckout
        label="Order"
        name="Pastabilities"
        description="Pastas heading your way."
        panelLabel="Order"
        amount={parseFloat(this.props.bill)}
        token={this.onToken}
        stripeKey={publishableKey}
        closed={this.onClosed}
      />
    )
  }
}

export default TakeMoney

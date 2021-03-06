import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

import { connect } from "react-redux";

import "./stripe-button.styles.scss";
import { clearCart } from "../../redux/cart/cart.actions";

const StripeCheckoutButton = ({ price, clearCart }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_eADZ9ec2176LqCWCU6rAtCjr00hthZc4nB";

  const onToken = token => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then(response => {
        alert("Payment successful");
        clearCart();
      })
      .catch(error => {
        console.log("Payment error", error);
        alert(
          "There was an issue with your payment. Please make sure to use provided credit card"
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Atomic Shop"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  clearCart : () => dispatch(clearCart())
});

export default connect(null,mapDispatchToProps)(StripeCheckoutButton);

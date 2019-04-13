import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class MyApp extends React.Component
{
    render()
    {
        const onSuccess = payment => {
            console.log("Payment was succeded",payment);
            this.props.clearCard();
            this.props.history.push("/");
        };
        const onCancel = data => {
            console.log("Payment was cancelled",data);
        };
        const onError = err => {
            console.log("error",err);
        };
        let env = "sandbox";
        let currency = "USD";

        const client = {
            sandbox : "sandbox",//process.env.REACT_APP_APP_ID,
            production : "YOUR-PRODUCTION-APP-ID"
        };
        return (
            <PaypalExpressBtn
            env = {env}
            client = {client}
            currency = {currency}
            total = {this.props.total}
            onError = {onError}
            onSucces = {onSuccess}
            onCancel = {onCancel}
            />
        );
    }
}
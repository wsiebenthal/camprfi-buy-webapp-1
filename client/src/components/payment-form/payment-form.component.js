import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import "./payment-form.css";

const options = {
    style: {
        base: {
            fontSize: "16px",
        },
        invalid: {
            color: "#9e2146",
        },
    },
};

export const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    // const amount = useSelector('amount');
    const amount = "70";
    const currentUser = "value from the form";
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const order = {
        orderNumber: "123456",
        productId: "57348757345",
        firstName: "Front",
        lastName: "End",
        email: "fromfrontend",
        // device,
    };

    const paymentHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        const response = await fetch("http://localhost:8000/api/payment/process", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: amount * 100 }),
        }).then((res) => res.json());

        console.log(response.client_secret);

        const { client_secret } = response;

        console.log(client_secret);

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: "Olga Popov",
                },
            },
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === "succeeded") {
                alert("Payment Successful");

                order.paymentInfo = {
                    id: paymentResult.paymentIntent.id,
                    status: paymentResult.paymentIntent.status,
                };

                const response2 = await fetch("http://localhost:8000/api/orders", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(order),
                }).then((res) => res.json());

            }
        }
    };

    return (
        <div>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={paymentHandler}>
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <button id="pay_btn" type="submit" className="btn btn-block py-3">
                            Pay
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;

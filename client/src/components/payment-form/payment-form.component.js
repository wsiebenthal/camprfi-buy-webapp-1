import { CardElement } from "@stripe/react-stripe-js";

const PaymentForm = () => {
    return (
        <div>
            <CardElement />
            <button>Pay</button>
        </div>
    )



}

export default PaymentForm;
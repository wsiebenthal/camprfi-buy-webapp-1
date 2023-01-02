import { useEffect, useState } from "react";
import PaymentForm from "../components/payment-form/payment-form.component";


import { getAllProducts } from "../services/InternalApiService";

export const PaymentPage = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log("in use effect");
        getAllProducts()
            .then((data) => {
                console.log("data " + data);
                console.log(data);
                console.log(data.data[0].default_price);
                console.log(data.data[0].description);
                setProducts(data.data);
                console.log("set products data");
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <div>
                <PaymentForm></PaymentForm>
            </div>
        </div>
    );
};

export default PaymentPage;

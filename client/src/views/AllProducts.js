import { useEffect, useState } from "react";
import PaymentForm from "../components/payment-form/payment-form.component";

import ProductCard from "../components/product-card/product-card.component";

import { getAllProducts } from "../services/InternalApiService";

export const AllProducts = (props) => {
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
            <h1>All Products</h1>

            <div className="products-container">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="products-container">
                {products
                    .filter((product) => product.name.includes("10Gb for 1 Day"))
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>

            <div>
                <PaymentForm></PaymentForm>
            </div>
        </div>
    );
};

export default AllProducts;

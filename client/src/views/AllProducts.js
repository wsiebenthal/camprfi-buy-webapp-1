import { Fragment, useEffect, useState } from 'react';

import ProductCard from "../components/product-card/product-card.component";

import {
    getAllProducts,
  } from '../services/InternalApiService';


export const AllProducts = (props) => {
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        console.log('in use effect')
        getAllProducts()
            .then((data) => {
            console.log(data);
            setProducts(data.data);
            console.log('set products data')
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
                <ProductCard key={product.id} product={product}/>
            ) )}
        
        
        </div>
        
        
        </div>
    
    );
};

export default AllProducts;
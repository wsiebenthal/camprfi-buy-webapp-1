import './product-card.css'

const ProductCard = ({product}) => {
    const { name, price } = product; 

    return (

        <div className="product-card-container"> 

        <div className="shadow mb-4 rounded border p-4 px-2"> 
        <div className="card-body">
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <button className="btn btn-primary"> Purchase</button>
    </div>
        
        
        </div>

        


    );
};

export default ProductCard;
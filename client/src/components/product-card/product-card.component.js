import "./product-card.css";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
    // const { product } = props;
    const { price, nickname } = props;

    return (
        <div className="product-card-container">
            <div className="shadow mb-4 rounded border p-4 px-2">
                <div className="card-body">
                    <div className="name">{nickname}</div>
                    <div className="price">${price}</div>
                </div>
                <Link to={`/payment`} className="btn btn-sm btn-outline-warning mx-1">
                    Pay
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;

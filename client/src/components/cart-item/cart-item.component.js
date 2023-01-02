export const CartItem = (props) => {
    const { nickname, price } = props;

    return (
        <div>
            <h2> Cart Item</h2>
            <p>{nickname}</p>
            <p>${price}</p>
            <p> tax:</p>
            <p>total: </p>
        </div>
    );
};

export default CartItem;
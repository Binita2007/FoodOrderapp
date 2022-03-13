import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem"
import CheckoutForm from "./CheckoutForm";


const Cart = (props) => {
    const [showForm, setShowform] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount:1});
    }

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }
    const checkoutFormHandler = () => {
    setShowform(true);
    }

    const orderSubmitHandler = async(userData) => {
        setIsSubmitting(true)
        try{
      const response =  await fetch('https://foodorder-app-c605b-default-rtdb.firebaseio.com//orders.json',{
         method: 'POST',
         body: JSON.stringify({
             user: userData,
             orderedItems: cartCtx.items
         })
        })
         if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const responseData = await response.json() ;
    }catch(error){
        console.log(error);
        setError(true);
    }
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
   
    } 


   
    const cartItems = (
        <ul className={classes['cart-items']}>
        {cartCtx.items.map(item =>(
        <CartItem key={item.id}
                  name={item.name}
                  price={item.price}
                  amount={item.amount}
                  onAdd={cartItemAddHandler.bind(null, item)}
                  onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
    ))}
    </ul>
          )
    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Cancel</button>
        {hasItems && <button onClick={checkoutFormHandler} className={classes.button}>Order</button>}
    </div>

    const cartModalContent = <React.Fragment>
    { cartItems }
        <div className = { classes.total } >
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
    { showForm && <CheckoutForm
        onCancel={props.onClose}
        onOrderSubmit={orderSubmitHandler}
         />}
{ !showForm && modalActions }</React.Fragment>

const didSubmitModalContent = <React.Fragment>
    <p>Successfully sent your order</p>
    <div className={classes.actions}>
    <button className={classes.button} onClick={props.onClose}>Cancel</button></div>
</React.Fragment>

    return(
        <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent }  
        {isSubmitting && <h2> Loading ...</h2>} 
         {!isSubmitting && didSubmit && didSubmitModalContent }
        </Modal>

    )
};


export default Cart;
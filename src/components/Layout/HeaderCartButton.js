import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton =  (props) => {
const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false)
    
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => {//reduce method transforms the array of data into single value i.e single number
        return currNumber + item.amount;
    }, 0);

    const button = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`

    useEffect(() => {
        if(numberOfCartItems === 0){
            return;   
             }
     setButtonIsHighlighted(true) 
     const timer = setTimeout(() => {
        setButtonIsHighlighted(false) 
     }, 300);  
    return() => {
    clearTimeout(timer);
    }
    }, [numberOfCartItems])



    return (
            <button className={button} onClick={props.onClick}>
            <span className={classes.icon}>
             <CartIcon />   
            </span>
            <span>Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    
    )
};

export default HeaderCartButton;
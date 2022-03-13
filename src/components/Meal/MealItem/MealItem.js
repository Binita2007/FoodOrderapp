import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);

    const addCartItem = (amount) =>{
      cartCtx.addItem({
       id: props.id,
       name: props.name,
       amount: amount,
       price: props.price   
      })
    }
    const price = `$${props.price.toFixed(2)}`;//one $ sign is to display dollar sign and one is used in combination with curly braces in template literal
    return(
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddCartItems={addCartItem}/>
            </div>
        </li>

    )
};

export default MealItem;
import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef(); 


function formSubmitHandler (event){
event.preventDefault();
    const enteredAmount = amountInputRef.current.value;// this value is always a string 
    const enteredAmountNumber = +enteredAmount; //inorder to convert string to number we added this+
    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
    setAmountIsValid(false);
    return;
    };
    props.onAddCartItems(enteredAmountNumber);
}

    return(
            <form className={classes.form} onSubmit={formSubmitHandler}>
            <Input label="Amount" 
                  ref={amountInputRef}//refs can't be used in custom component therefore 
                  //inorder to make it work we initialize the forwardRef in Input component
                 input={{
                 type:"number", 
                id:"amount" + props.id,
                min:"1",
                max:"5",
                step:"1",
                defaultValue:"1"}}/>
            <button>+ ADD</button>
            {!amountIsValid && <p> Please enter a valid amount 1-5</p>}
            </form>
        
    )
};

export default MealItemForm;
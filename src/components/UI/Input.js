import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />
        </div>
    );
});
export default Input;
// we are wrapping this component with forwardRef so that this component function has 
//an argument of forwarRef then now u get the ref which now can be set through the ref prop
//on ur component as a second parameter and now u can use it inside of ur component function
// to forward that ref prop to the input 

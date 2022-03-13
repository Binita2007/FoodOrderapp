import React from "react";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return(
        <React.Fragment>
            <header className={classes.header}>
                <h1> React Meals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes["main-image"]}>
            {/* //since it is the className which includes dash in its name therefore it is written in square brackets */}
            <img src={mealsImage} alt="A range of delicious dishes" />
            </div>
        </React.Fragment>
    )
};

export default Header;
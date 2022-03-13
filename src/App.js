import React,{ useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meal/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";


function App() {
const [cartIsShown, setCartIsShown] = useState(false);

function ShowCartHandler(){
  setCartIsShown(true);
}
function hideCartHndler(){
  setCartIsShown(false)
}

  return (
   <CartProvider>
  {cartIsShown && <Cart onClose={hideCartHndler}/> }
     <Header onShowCart={ShowCartHandler}/>
     <main>
       <Meals ></Meals>
     </main>
    </CartProvider>
  );
}

export default App;

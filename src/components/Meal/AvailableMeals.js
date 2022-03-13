import React,{ useState, useEffect} from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";



const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        const fetchMeals = async() => {
            try{
        const response = await fetch('https://foodorder-app-c605b-default-rtdb.firebaseio.com//meals.json')
         if (!response.ok) {
            throw new Error('Something went wrong');
         }
        const responseData = await response.json() 
        
        let loadedMeals = [];
        for(const key in responseData){
            loadedMeals.push({
              id: key,
              name: responseData[key].name,
              description: responseData[key].description,
              price: responseData[key].price  
            })
        }
        setMeals(loadedMeals);
        setIsLoading(false)
    }catch(error){
        setIsLoading(false);
        setError(error.message);
    };
        }
        fetchMeals()
        //as incase we are not using try catch inside the async fetchMeals funtion and want to use catch
        // function to catch error  outside of the async function therefore we cant 
        //call try catch block here instead we are only calling the catch function to catch any errors
    //.catch((error) => {
    //      setIsLoading(false);
    //      setError(error.message);
    //  });
    }, []);

    if(isLoading){
        return(
        <section className={classes.MealsLoading}>
            <p>Loading ... </p>
        </section>
        );
    }
    if(error){
        return(
            <section className={classes.MealsError}>
                <p>{error}</p>
            </section>
        )
    }

    const mealsList = meals.map((meal) => (
    <MealItem key={meal.id}
              id={meal.id}
              name={meal.name}
              price={meal.price}
              description={meal.description} />));

    return(
<section className={classes.meals}>
    <Card>
    <ul>
    {mealsList}    
    </ul>
     </Card>
</section>

    )
};

export default AvailableMeals;
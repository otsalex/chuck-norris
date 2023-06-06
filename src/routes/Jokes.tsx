import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { JokeService } from "../services/JokeService";
import { IJoke } from "../domain/IJoke";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { ActionType } from "../redux/actionTypes/actionTypes";
import { useNavigate } from "react-router-dom";

const Jokes = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { newJoke, savedJokes } = useTypedSelector((state) => state.jokes);

    const [values, updateValues] = useState({
        joke: {} as IJoke,
        categories: [] as string[],
        chosenCategory: "animal"
    })

    const service = new JokeService();

    useEffect(() => {
        //fetch categories and save them in redux
        service.getCategories().then(
            response=>{
                if(response instanceof Error) navigate("../error")
                else{
                    dispatch({
                        type: ActionType.ASSIGN_CATEGORIES,
                        payload: response 
                    });
                    //update local variables with data from redux
                    updateValues({chosenCategory: values.chosenCategory, categories: response, joke: newJoke})
                }
            })
        
            // warning muted because the service cannot be added to the dependancies nor removed
            // eslint-disable-next-line
    }, [values.joke, newJoke, values.chosenCategory, navigate, dispatch])


 

    const newJokeHandler = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {

        // if requested random joke
        if(event.currentTarget.name === 'random'){
            let response = await service.getJoke();
            if(response instanceof Error) navigate("../error")
            else{
                // assign category name
                response.category = "random";
                dispatch({
                    type: ActionType.ASSIGN_NEW_JOKE,
                    payload: response 
                });
            };
        }
        // if requested joke from a category
        else{
            let response = await service.getJokeByCategory(values.chosenCategory);
            if(response instanceof Error) navigate("../error")
            else{
                // assign category name
                response.category = values.chosenCategory;
                dispatch({
                    type: ActionType.ASSIGN_NEW_JOKE,
                    payload: response 
            })
        };
        }
      }
      
    const saveJoke = async() =>{
        
        if(values.joke.value === undefined) return;
        console.log(values.joke.value)
        // avoid saving identical jokes
        for (let joke of savedJokes) {
            if(joke.id === values.joke.id){
                alert("This joke is already in your favourites!")
                return;
            }
        }
        dispatch({
            type: ActionType.SAVE_JOKE_TO_FAVOURITES,
            payload: values.joke 
        });
        alert("Successfully saved a joke, go check it out in the favourites!");
    }

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) =>{
        updateValues({...values, chosenCategory: event.target.value});
    }

    return (
        <>
        <div className="info-box">
            
            <img src="https://www.pngplay.com/wp-content/uploads/5/Chuck-Norris-PNG-Photos.png" alt="" width="100" 
            height="100" />

            <select value={values.chosenCategory} onChange={(event) => handleChange(event)}>
                {values.categories.map((cat, index) => 
                <option value={cat} key={index}>{cat}</option>
                )}
            </select>
            <button onClick={(e) => newJokeHandler(e)} name='fromCategory' className="button-23"> Do a {values.chosenCategory} joke</button>
            <button onClick={(e) => newJokeHandler(e)} name='random' className="button-23"> Do a random joke</button>
            

            <h3>{values.joke.value}</h3>
            <button onClick={() => saveJoke()} className="button-23">Save it for later</button>
            
        </div>
        </>
    );
}

export default Jokes;
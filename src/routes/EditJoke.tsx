import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IJoke } from "../domain/IJoke";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { useDispatch } from "react-redux";
import { ActionType } from "../redux/actionTypes/actionTypes";



const EditJoke = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const { savedJokes, categories } = useTypedSelector((state) => state.jokes);

    const [values, setValues] = useState({
        joke: {} as IJoke,
        categories: categories,
        chosenCategory: ""

    });
    
    
    useEffect(() => {
        // get the joke by id and set the state
        savedJokes.forEach(joke => {
            if(joke.id === id) setValues({categories: categories, joke: joke, chosenCategory: joke.category});
        });
    }, [id, savedJokes, categories])


    const handleChange = (event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        // if changing the joke value

        // only change the chosenCategory when the target is correct
        let category;
        if(event.target.name === "category"){
             category = event.target.value
        } 
        // else keep the old one
        else{
             category = values.chosenCategory;
        }
        setValues({ ...values,
            joke: {
                ...values.joke,
                [event.target.name]: event.target.value
            },
            chosenCategory: category
        });
        

        
    }


    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        
        event.preventDefault();

        // delete existing joke
        dispatch({
            type: ActionType.REMOVE_JOKE,
            payload: values.joke.id 
        });

        // if just editing, replace the joke with a new one
        if(event.currentTarget.name === 'save'){
            dispatch({
                type: ActionType.SAVE_JOKE_TO_FAVOURITES,
                payload: values.joke 
            });
        }
        navigate("../favourites");
    }

    return (
        <section className="form-box">
        <form action="" method="post">
            <div className="textarea-wrapper" >
            <textarea
                name='value'
                value ={values.joke.value}
                onChange={(e) => handleChange(e)}>
            </textarea>
            <br />

            <select 
                value={values.chosenCategory} 
                onChange={(event) => handleChange(event)}
                name='category'>
                    {values.categories.map((cat, index) => 
                    <option value={cat} key={index}>{cat}</option>
                    )}
            </select>

            </div >
            <div >
                <button 
                    onClick={(e) => onSubmit(e)}
                    className="formBtn"
                    name="save">
                        Save
                </button>
                <button 
                    onClick={(e) => onSubmit(e)}
                    className="formBtn">
                        Delete
                </button>   
            </div>
        </form>
        </section>
    );
}

export default EditJoke;

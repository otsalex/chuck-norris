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

    useEffect(() => {
        let validId = false;
        savedJokes.forEach(joke => {
            if(joke.id === id){
                validId = true;
            }
        })
        if(!validId) navigate('../');
        
      }, [id, navigate, savedJokes]);
      
    

    const [joke, setJoke] = useState(savedJokes.find(j => j.id === id) as IJoke || {} as IJoke)
    //const [chosenCategory, setCategory] = useState(joke.category);
    
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
        setJoke({...joke, [event.target.name]: event.target.value})
        
    }

    const onSave = async () => {
        dispatch({
            type: ActionType.UPDATE_JOKE,
            payload: joke
        });
        navigate("../favourites");
    }

    const onDelete = async () => {

        dispatch({
            type: ActionType.REMOVE_JOKE,
            payload: joke.id 
        });
        navigate("../favourites");
    }


    return (
        <section className="form-box">
        <form>
            <div className="textarea-wrapper" >
            <textarea
                name='value'
                value ={joke.value}
                onChange={handleChange}>
            </textarea>
            <br />

            <select 
                value={joke.category} 
                onChange={handleChange}
                name='category'>
                    {categories.map((cat, index) => 
                    <option value={cat} key={index}>{cat}</option>
                    )}
            </select>

            </div >
            <div >
                <button 
                    onClick={onSave}
                    className="formBtn"
                    name="save"
                    type="button">
                        Save
                </button>
                <button 
                    onClick={onDelete}
                    className="formBtn"
                    type="button">
                        Delete
                </button>   
            </div>
        </form>
        </section>
    );
}

export default EditJoke;

import { ChangeEvent, useEffect, useState } from "react";

import { useTypedSelector } from "../hooks/useTypeSelector";
import { Link } from "react-router-dom";

const Favourites = () => {

    
    const { savedJokes, categories } = useTypedSelector((state) => state.jokes);

    const [values, updateValues] = useState({
        savedJokes: savedJokes,
        filteredJokes: savedJokes,
        categories: categories,
        chosenCategory: "all"
    })


    useEffect(() => {
    
        // by default use full list as filtered
        let filtered = values.savedJokes;
        // if anything else than "all" is chosen from dropdown, filter the list
        if(values.chosenCategory !== "all"){
            filtered = values.savedJokes.filter(j => j.category === values.chosenCategory);
        }

        updateValues({
            chosenCategory: values.chosenCategory,
            savedJokes: savedJokes, 
            categories: categories,
            filteredJokes: filtered
        });
    }, [savedJokes, values.chosenCategory, values.savedJokes, categories]);

    
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) =>{
        updateValues({...values,
                chosenCategory: event.currentTarget.value,
            });
    }

    return (
        <>


        <table className="table">
            <thead className="table-head">
                <tr className="table-row">
                    <th className="table-head-title-main">
                        Joke
                    </th>
                    <th className="table-head-title">
        
                        <select value={values.chosenCategory} onChange={(event) => handleChange(event)}>
                        <option value="all" key="-1">all</option>
                        <option value="random" key="-2">random</option>
                            {values.categories.map((cat, index) => 
                        <option value={cat} key={index}>{cat}</option>
                        )}
                        </select>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

                {values.filteredJokes.reverse().map((joke, index) => 
                <tr key={index}>
                    <td className="table-data-field">
                        {joke.value}
                    </td>
                    <td className="table-data-field">
                        {joke.category}
                    </td>
                    <td>
                        <Link to={"../edit/" + joke.id} >Edit</Link>
                    </td>
                    
                </tr>)}
            </tbody>
        </table>
    
        </>
    );
}

export default Favourites;
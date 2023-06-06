

// null is set as the default value here for state, because Redux will complain if state is undefined. 
// You can set initial state here, but it is recommended on the Redux documentation to preload the state within the redux store. 

import { IJoke } from "../../domain/IJoke";
import { Action, ActionType } from "../actionTypes/actionTypes";

interface State {
    savedJokes: IJoke[];
    newJoke: IJoke;
    categories: string[]
}

const init = {
    savedJokes: [],
    newJoke: {} as IJoke,
    categories: []
};


export default function jokeReducer(state: State = init, action: Action):State {
    switch(action.type) {
        case ActionType.ASSIGN_CATEGORIES:
            return {...state,
                categories: action.payload
            } 
        case ActionType.ASSIGN_NEW_JOKE:
            return {...state,
                newJoke: action.payload,
            }
        case ActionType.SAVE_JOKE_TO_FAVOURITES:
            return { ...state,
                savedJokes: [...state.savedJokes, action.payload],
            }
        case ActionType.REMOVE_JOKE:
        return { ...state,
            savedJokes: state.savedJokes.filter(j => j.id !== action.payload),
        }
        default: 
            return state;
        }
}
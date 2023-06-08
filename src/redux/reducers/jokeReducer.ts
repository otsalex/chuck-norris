import { type IJoke } from "../../domain/IJoke";
import { type Action, ActionType } from "../actionTypes/actionTypes";

interface State {
  savedJokes: IJoke[];
  newJoke: IJoke;
  categories: string[];
}

const init = {
  savedJokes: [],
  newJoke: {} as IJoke,
  categories: [],
};

export default function jokeReducer(
  state: State = init,
  action: Action
): State {
  switch (action.type) {
    case ActionType.ASSIGN_CATEGORIES:
      return { ...state, categories: action.payload };
    case ActionType.ASSIGN_NEW_JOKE:
      return { ...state, newJoke: action.payload };
    case ActionType.SAVE_JOKE_TO_FAVOURITES:
      return { ...state, savedJokes: [...state.savedJokes, action.payload] };
    case ActionType.REMOVE_JOKE:
      return {
        ...state,
        savedJokes: state.savedJokes.filter((j) => j.id !== action.payload),
      };
    case ActionType.UPDATE_JOKE:
      return {
        ...state,
        savedJokes: state.savedJokes.map((joke) => {
          if (joke.id === action.payload.id) {
            return {
              ...joke,
              value: action.payload.value,
              category: action.payload.category,
            };
          }
          return joke;
        }),
      };
    default:
      return state;
  }
}

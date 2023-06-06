import { IJoke } from "../../domain/IJoke";


export enum ActionType {
    ASSIGN_CATEGORIES = 'ASSIGN_CATEGORIES',
    ASSIGN_NEW_JOKE = 'ASSIGN_NEW_JOKE',
    SAVE_JOKE_TO_FAVOURITES = 'SAVE_JOKE_TO_FAVOURITES',
    REMOVE_JOKE = 'REMOVE_JOKE'
}

interface actionSaveCategories {
    type: ActionType.ASSIGN_CATEGORIES;
    payload: string[]
}

interface actionNewJoke {
    type: ActionType.ASSIGN_NEW_JOKE;
    payload: IJoke;
}

interface actionSaveJoke{
    type: ActionType.SAVE_JOKE_TO_FAVOURITES;
    payload: IJoke;
}

interface actionRemoveJoke {
    type: ActionType.REMOVE_JOKE;
    payload: string
}
export type Action = actionSaveCategories | actionNewJoke | actionSaveJoke | actionRemoveJoke;
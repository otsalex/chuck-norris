/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  type ChangeEvent,
  useContext,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { ActionType } from "../redux/actionTypes/actionTypes";
import { useNavigate } from "react-router-dom";
import { Service } from "./Root";

const Jokes = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { newJoke, savedJokes, categories } = useTypedSelector(
    (state) => state.jokes
  );

  const [chosenCategory, setCategory] = useState("animal");

  const service = useContext(Service);

  void useMemo(async () => {
    await service.getCategories().then((response) => {
      if (response instanceof Error) navigate("../error");
      else {
        response.push("random");
        dispatch({
          type: ActionType.ASSIGN_CATEGORIES,
          payload: response,
        });
      }
    });
  }, [dispatch, navigate, service]);

  const newJokeHandler = async (isRandom: boolean): Promise<void> => {
    // if requested random joke
    let response;
    if (isRandom) response = await service.getJoke();
    // if requested joke from a category
    else response = await service.getJokeByCategory(chosenCategory);

    if (response instanceof Error) {
      navigate("../error");
      return;
    }
    // assign category name
    response.category = isRandom ? "random" : chosenCategory;
    dispatch({
      type: ActionType.ASSIGN_NEW_JOKE,
      payload: response,
    });
  };

  const saveJoke = async (): Promise<void> => {
    if (newJoke === undefined) return;

    // avoid saving identical jokes
    for (const joke of savedJokes.values()) {
      if (joke.id === newJoke.id) return;
    }

    dispatch({
      type: ActionType.SAVE_JOKE_TO_FAVOURITES,
      payload: newJoke,
    });
  };
  const saveDisabled = (): boolean => {
    for (const joke of savedJokes) {
      if (joke.id === newJoke.id) return true;
    }
    return false;
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setCategory(event.target.value);
  };

  return (
    <>
      <div className="info-box">
        <img
          src="https://www.pngplay.com/wp-content/uploads/5/Chuck-Norris-PNG-Photos.png"
          alt=""
          width="100"
          height="100"
        />

        <select value={chosenCategory} onChange={handleChange}>
          {categories.map((cat, index) => (
            <option value={cat} key={index}>
              {cat}
            </option>
          ))}
        </select>
        <button
          onClick={async () => {
            await newJokeHandler(false);
          }}
          name="fromCategory"
          className="button-23"
        >
          {" "}
          Do a {chosenCategory} joke
        </button>
        <button
          onClick={async () => {
            await newJokeHandler(true);
          }}
          name="random"
          className="button-23"
        >
          {" "}
          Do a random joke
        </button>

        <h3>{newJoke.value}</h3>
        <button
          onClick={saveJoke}
          disabled={saveDisabled()}
          className="button-23"
        >
          Save it for later
        </button>
      </div>
    </>
  );
};

export default Jokes;

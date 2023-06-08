import { type ChangeEvent, useMemo, useState, type ReactElement } from "react";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { Link } from "react-router-dom";

const Favourites = (): ReactElement => {
  const { savedJokes, categories } = useTypedSelector((state) => state.jokes);
  const [chosenCategory, setCategory] = useState("all");
  const filtered = useMemo(() => {
    if (chosenCategory !== "all")
      return savedJokes.filter((j) => j.category === chosenCategory).reverse();
    else return savedJokes.reverse();
  }, [chosenCategory, savedJokes]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setCategory(event.currentTarget.value);
  };

  return (
    <>
      <table className="table">
        <thead className="table-head">
          <tr className="table-row">
            <th className="table-head-title-main">Joke</th>
            <th className="table-head-title">
              <select value={chosenCategory} onChange={handleChange}>
                <option value="all" key="-1">
                  all
                </option>
                <option value="random" key="-2">
                  random
                </option>
                {categories.map((cat, index) => (
                  <option value={cat} key={index}>
                    {cat}
                  </option>
                ))}
              </select>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td className="table-data-field">No jokes to show!</td>
            </tr>
          ) : (
            filtered.map((joke, index) => (
              <tr key={index}>
                <td className="table-data-field">{joke.value}</td>
                <td className="table-data-field">{joke.category}</td>
                <td>
                  <Link to={"../edit/" + joke.id}>Edit</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default Favourites;

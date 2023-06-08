import { useTypedSelector } from "../hooks/useTypeSelector";
import { useEffect, useState } from "react";
import { type IJoke } from "../domain/IJoke";

const About = () => {
  const { newJoke } = useTypedSelector((state) => state.jokes);

  const [joke, updateJoke] = useState({} as IJoke);

  useEffect(() => {
    updateJoke(newJoke);
  }, [newJoke]);

  return (
    <>
      <div className="info-box">
        <h3>About me</h3>
        <p>Name: Alex</p>
        <p>Age: 21</p>

        <p>
          Favourite joke:
          <br />
          {joke.value === undefined ? "Chuck" : joke.value}
        </p>
      </div>
    </>
  );
};

export default About;

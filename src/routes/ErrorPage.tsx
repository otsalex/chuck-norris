import { type ReactElement } from "react";
import { Link } from "react-router-dom";

const ErrorPage = (): ReactElement => {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, Chuck is not in a joking mood right now.</p>
      <Link to="">Back to jokes.</Link>
    </div>
  );
};

export default ErrorPage;

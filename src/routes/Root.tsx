/* eslint-disable @typescript-eslint/consistent-type-assertions */
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { JokeService } from "../services/JokeService";
import { type ReactElement, createContext } from "react";

export const Service = createContext<JokeService>({} as JokeService);

const Root = (): ReactElement => {
  const service = new JokeService();

  return (
    <Service.Provider value={service}>
      <div className="container">
        <Header />
        <div className="content-wrap">
          <Outlet />
        </div>
        <Footer />
      </div>
    </Service.Provider>
  );
};

export default Root;

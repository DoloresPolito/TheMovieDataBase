import React, { useState, createContext } from "react";
import { render } from "react-dom";
import "./index.css";
import "bulma/css/bulma.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import SearchProvider from "./context/SearchContext";
import PeopleContext from "./context/PeopleContext"

export const UserContext = createContext();

const Root = () => {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <React.StrictMode>
        <UserContext.Provider value={{ user, setUser }}>
          <SearchProvider>
            <PeopleContext>
            <App />
            </PeopleContext>
          </SearchProvider>
        </UserContext.Provider>
      </React.StrictMode>
    </BrowserRouter>
  );
};

export default render(<Root />, document.getElementById("root"));

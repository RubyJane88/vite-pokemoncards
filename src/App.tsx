import React from "react";
import "./App.css";
import Pokedex from "./app/views/Pokedex";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;

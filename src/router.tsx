import React from "react";
import { Route, Switch } from "react-router";
import Pokedex from "./app/views/Pokedex";
import PokeDetail from "./app/views/PokeDetail";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Pokedex} />
      <Route exact path={"/poke-details/:id"} component={PokeDetail} />
    </Switch>
  );
};

export default Router;

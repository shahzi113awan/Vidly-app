import React from "react";

import Customers from "./Components/customers";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./Components/movies";
import NotFound from "./Components/notFound";
import Rentals from "./Components/rentals";
import NavBar from "./Components/navbar";
import MoviesForm from "./Components/moviesForm";
import Login from "./Components/Common/login";
import Register from "./Components/register";

import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <main className="container">
        <Switch>
          <Route path="/register" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/movies/:id" component={MoviesForm}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/notfound" component={NotFound}></Route>
          <Redirect exact from="/" to="/movies"></Redirect>
          <Redirect to="/notfound"></Redirect>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;

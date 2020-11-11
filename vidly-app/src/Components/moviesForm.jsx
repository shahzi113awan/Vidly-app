import React, { Component } from "react";
import Form from "./Common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../Services/fakeMovieService";
import { getGenres } from "../Services/fakeGenreService";

class MoviesForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: " ", dailyRentalRate: "" },
    genre: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().max(20),
    genreId: Joi.string().required(),
    NumberInStock: Joi.number().required().min(0).max(100),
    dailyRentalRate: Joi.number().required().min(0).max(10),
  };
  componentDidMount() {
    const genre = getGenres();


    this.setState({ genre });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;
    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/notfound");
    this.setState({ data: this.mapToViewModel(movie) });
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
    console.log("submitted");
  };
  render() {
    const { genre } = this.state;
    return (
      <div>
        <h1>Movies Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", genre)}
          {this.renderInput("numberInstock", "Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("MovieForm")}
        </form>
        {/* <button
          className="btn btn-primary"
          onClick={() => history.push("/movies")}
        >
          Save
        </button> */}
      </div>
    );
  }
}

export default MoviesForm;

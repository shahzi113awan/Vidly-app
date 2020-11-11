import React, { Component } from "react";
import { getMovies } from "../Services/fakeMovieService";
import { Link } from "react-router-dom";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../Services/fakeGenreService";
import ListGroup from "./Common/listGroup";
import _ from "lodash";
import MoviesTable from "./Common/moviesTable";
import SearchBox from "./Common/searchbox";

class Movies extends Component {
  state = {
    pageSize: 4,
    movies: [],
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    genre: [],
    searchQuery: "",
    selectedGenre: null,
  };
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };
  handleClick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };
  componentDidMount() {
    const genre = [{ _id: "", name: "All genre" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genre: genre,
    });
  }
  handleGenreSelected = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handelSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  render() {
    //console.log(this.state.genre);
    //console.log(this.state.selctedGenre);
    const { length: count } = this.state.movies;
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      genre,
      selectedGenre,
      sortColumn,
    } = this.state;

    if (count === 0) return <h1>No result</h1>;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    //  console.log(sortColumn.order);
    const movies = paginate(sorted, currentPage, pageSize);
    return (
      <div className="row">
        {/* {count === 0 && <h1>No Result</h1>}
        {count != 0 && (
          <h1>showing {count}</h1>
        )} */}
        <div className="col-3 mt-4 mx-0">
          <ListGroup
            items={genre}
            onItemSelect={this.handleGenreSelected}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p className="h5">Showing {count} results</p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handelSearch}
          />
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onClick={this.handleClick}
          />
          <Pagination
            itemsCount={filtered.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

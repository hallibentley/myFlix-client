import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';

import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card className="movie-view">
        <Card.Img className="movie-poster" variant="top" src={movie.ImagePath} crossOrigin='anonymous' />
        <Card.Body>
          <Card.Title className="movie-title">{movie.Title}</Card.Title>

          <Card.Text className="movie-description">{movie.Description}</Card.Text>

          <Card.Text className="movie-genre">
            Genre: {movie.Genre.Name}
            <Link to={`genres/${movie.Genre.Name}`}>
              <Button variant="link"> More info</Button>
            </Link>
          </Card.Text>

          <Button onClick={() => onBackClick()} variant="link">Back</Button>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }

}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  })
    .isRequired,
  onBackClick: PropTypes.func.isRequired
};
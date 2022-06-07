import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import './movie-card.scss';

export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin='anonymous' />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};
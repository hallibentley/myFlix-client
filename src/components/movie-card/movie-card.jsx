import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from 'axios';

import './movie-card.scss';

export class MovieCard extends React.Component {

  addFavoriteMovie(movieId) {
    const currentUser = localStorage.getItem('user');
    const currentToken = localStorage.getItem('token');
    axios.post(`https://hallibentley-movie-api.herokuapp.com/users/${currentUser}/movies/${movieId}`,
      {},
      {
        headers: { Authorization: `Bearer ${currentToken}` }
      })
      .then((response) => {
        console.log(response.data)
        alert(`The movie was successfully add to your list.`)
      }).
      catch(error => console.error(error))
  }

  render() {
    const { movie } = this.props;

    return (
      <React.Fragment>
        <Card>
          <Card.Img variant="top" src={movie.ImagePath} crossOrigin='anonymous' />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Open</Button>
            </Link>
            <Button onClick={() => this.addFavoriteMovie(movie._id)}>Add to favorites</Button>
          </Card.Body>
        </Card>
      </React.Fragment>
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
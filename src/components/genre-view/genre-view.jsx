import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './genre-view.scss';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Card className="genreCard">
        <Card.Body>
          <Card.Title>{genre.Name}</Card.Title>
          <Card.Text>{genre.Description}</Card.Text>
          <Button onClick={() => onBackClick()} variant="link">Back</Button>
        </Card.Body>
      </Card>
    );
  }
}
import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';

import './profile-view.scss';

export class ProfileView extends React.Component {

  render() {
    const { user } = this.props;

    return (
      <Card className="userCard">
        <Card.Body>
          <Card.Title>Username: {user.Username}</Card.Title>
          <CardGroup>
            <Card.Text>Email: {user.Email}</Card.Text>
            <Card.Text>Birthday: {user.Birthday}</Card.Text>
            <Card.Text>Favorite Movies: {user.FavoriteMovies}</Card.Text>
          </CardGroup>
        </Card.Body>
      </Card>
    );
  }
}

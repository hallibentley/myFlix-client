import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, FormGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

import { FavoriteMoviesView } from './favorite-movies-view';
import { UpdateView } from './update-view';

import './profile-view.scss';

export function ProfileView(props) {
  const { movies } = props;
  const [user, setUser] = useState(props.user);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [username, setUsername] = useState(' ');
  const [password, setPassword] = useState(' ');
  const [email, setEmail] = useState(' ');
  const [birthday, setBirthday] = useState(' ');


  const currentUser = localStorage.getItem('user');
  const currentToken = localStorage.getItem('token');

  //retrieve user info from localstorage//
  const getUser = () => {
    axios.get(`https://hallibentley-movie-api.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${currentToken}` }
    })
      .then((response) => {
        setUser(response.data)
        setFavoriteMovies(response.data.FavoriteMovies)
        setUsername(response.data.Username)
        setEmail(response.data.Email)
        setBirthday(response.data.Birthday)
      })
      .catch(e => {
        console.log('Error')
      });
  }

  useEffect(() => {
    getUser()
  }, [])

  //client request to delete account//
  const handleDelete = () => {
    axios.delete(`https://hallibentley-movie-api.herokuapp.com/users/${currentUser}`,
      {
        headers: { Authorization: `Bearer ${currentToken}` }
      })
      .then(() => {
        alert(`The account ${user.Username} was successfully deleted`)
        localStorage.clear();
        window.open('register', '_self');
      })
      .catch(error => console.log(error))
  }

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={6}>
            <Card>
              <Card.Header>Your user info</Card.Header>
              <Card.Body>
                <Card.Text> Username: {username} </Card.Text>
                <Card.Text>Email: {email} </Card.Text>
                <Card.Text>Birthday: {birthday} </Card.Text>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>Delete your account</Card.Header>
              <Card.Body>
                <Button onClick={handleDelete}>Delete account</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Header>Make changes to your account</Card.Header>
              <Card.Body>
                <UpdateView user={user} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Card>
        <Card.Header>Your favorites list</Card.Header>
        <Card.Body>
          <FavoriteMoviesView
            movies={movies}
            favoriteMovies={favoriteMovies}
            currentUser={currentUser}
            currentToken={currentToken} />
        </Card.Body>
      </Card>

    </React.Fragment >
  )
}
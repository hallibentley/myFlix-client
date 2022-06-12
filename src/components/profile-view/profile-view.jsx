import React, { useEffect, useState } from 'react';
import { Card, Form, FormGroup, Button } from 'react-bootstrap';
import axios from 'axios';

import './profile-view.scss';

export function ProfileView() {
  const [username, setUsername] = useState(' ');
  const [password, setPassword] = useState(' ');
  const [email, setEmail] = useState(' ');
  const [birthday, setBirthday] = useState(' ');
  const [favoriteMovies, setFavoriteMovies] = useState(' ');

  const currentUser = localStorage.getItem('user');
  const currentToken = localStorage.getItem('token');

  //retrieve user info from localstorage//
  const getUser = () => {
    axios.get(`https://hallibentley-movie-api.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${currentToken}` }
    })
      .then((response) => {
        setUsername(response.data.Username)
        setEmail(response.data.Email)
        setBirthday(response.data.Birthday)
        console.log(response.data)
      })
      .catch(e => {
        console.log('Error')
      });
  }

  useEffect(() => {
    getUser()
  }, [])

  //retrieve favorite movies from API//
  const getFavoriteMovies = () => {
    axios.get(`https://hallibentley-movie-api.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${currentToken}` }
    })
      .then((response) => {
        setFavoriteMovies(response.data.FavoriteMovies)
      })
      .catch(e => {
        console.log('Error')
      });
  }

  useEffect(() => {
    getFavoriteMovies()
  }, [])

  //client request to update//
  const updateUser = () => {
    axios.put(`https://hallibentley-movie-api.herokuapp.com/users/${currentUser}`,
      {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      },
      {
        headers: { Authorization: `Bearer ${currentToken}` }
      })
      .then(() => {
        alert(`Your account was successfully updated`);
        localStorage.setItem('user', response.data.username)
      })
      .catch(error => {
        console.error(error);
        alert('Unable to update profile.');
      });
  }

  //client request to delete account//
  const deleteUser = () => {
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

      <Card>
        <Card.Header>Your user info</Card.Header>
        <Card.Body>
          <Card.Text> Username: {username} </Card.Text>
          <Card.Text>Email: {email} </Card.Text>
          <Card.Text>Birthday: {birthday} </Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Your favorites list</Card.Header>
        <Card.Body>
          <Card.Text>{favoriteMovies}</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Form>
          <Card.Header>Update your profile</Card.Header>
          <Card.Body>
            <FormGroup className='username'>
              <Form.Label>Username: </Form.Label>
              <Form.Control
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="username" />
            </FormGroup>
            <FormGroup className='email'>
              <Form.Label>Email: </Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="email" />
            </FormGroup>
            <FormGroup className='birthday'>
              <Form.Label>Birthday: </Form.Label>
              <Form.Control
                onChange={(e) => setBirthday(e.target.value)}
                value={birthday}
                type="text"
                placeholder="birthday (YYYY-MM-DD)" />
            </FormGroup>
            <FormGroup className='password'>
              <Form.Label>Password: </Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="text"
                placeholder="password" />
            </FormGroup>
            <Button>Confirm changes</Button>
          </Card.Body>
        </Form>

      </Card>

      <Card>
        <Card.Header>Delete your account</Card.Header>
        <Card.Body>
          <Button onClick={deleteUser}>Delete account</Button>
        </Card.Body>
      </Card>

    </React.Fragment >
  )
}
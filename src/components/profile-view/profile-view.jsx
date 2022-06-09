import React, { useState } from 'react';
import { Card, CardGroup, Form, FormGroup, Button } from 'react-bootstrap';
import axios from 'axios';

import './profile-view.scss';

export function ProfileView() {
  const [username, setUsername] = useState(' ');
  const [password, setPassword] = useState(' ');
  const [email, setEmail] = useState(' ');
  const [birthday, setBirthday] = useState(' ');

  const currentUser = localStorage.getItem('user');
  const currentToken = localStorage.getItem('token');

  //retrieve user info from localstorage//
  const getUser = () => {
    axios.get(`https://hallibentley-movie-api.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        setUsername(response.data.Username)
        setEmail(response.data.Email)
        console.log(response.data)
      })
      .catch(e => {
        console.log('Error')
      });
  }

  //client request to update//
  const updateuser = () => {
    axios.put(`https://hallibentley-movie-api.herokuapp.com/users/${user}`,
      {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      },


      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert(`Your account was successfully updated`);
      })
      .catch(error => {
        console.error(error);
        alert('Unable to update profile.');
      });
  }


  const deleteUser = () => {
    axios.delete(`https://hallibentley-movie-api.herokuapp.com/users/${user}`,
      {
        headers: { Authorization: `Bearer ${token}` }
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
      <br></br>
      <br></br>
      <Card>
        <Card.Header>Your user info</Card.Header>
        <Card.Body>
          <Card.Text>Username:</Card.Text>
          <Card.Text>Email:</Card.Text>
          <Card.Text>Birthday:</Card.Text>
          <Card.Text>Favorite Movies:</Card.Text>
        </Card.Body>
      </Card>
      <br></br>
      <br></br>
      <Card>
        <Form>
          <Card.Header>Update your profile</Card.Header>
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
        </Form>
      </Card>
      <br></br>
      <br></br>
      <Card>
        <Card.Header>Delete your account</Card.Header>
        <Card.Body>
          <Button onClick={deleteUser}>Delete account</Button>
        </Card.Body>
      </Card>

    </React.Fragment>
  )
}
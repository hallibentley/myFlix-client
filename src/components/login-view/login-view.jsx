import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import axios from 'axios';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username is required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be at least 5 characters long')
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password is required');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://hallibentley-movie-api.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
        });
    }
  };

  return (
    <Form className="login-form">
      <FormGroup className="form-group" controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          onChange={e => setUsername(e.target.value)}
          required
          placeholder="Enter your username"
        />
        {usernameErr && <p>{usernameErr}</p>}
      </FormGroup>

      <FormGroup className="form-group" controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="text"
          onChange={e => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
        {passwordErr && <p>{passwordErr}</p>}
      </FormGroup>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Log in
      </Button>
    </Form>
  );
}
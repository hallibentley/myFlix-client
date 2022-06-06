import React, { useState } from 'react';
import { Row, Col, Button, Form, Card, CardGroup } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('')
    ;
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

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
    if (!email) {
      setEmailErr('Email is required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Email is invalid');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://hallibentley-movie-api.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, please login!');
          window.open('/', '_self');
        })
        .catch(response => {
          console.error(response);
          alert('Unable to register')
        })
    }
  };

  return (
    <Row>
      <Col>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>Create your free account</Card.Title>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={e => setUsername(e.target.value)}
                    required
                    placeholder="Enter a username"
                  />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Enter a password"
                  />
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                  {emailErr && <p>{emailErr}</p>}
                </Form.Group>

                <Form.Group controlId="formBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={e => setBirthday(e.target.value)}
                    required
                    placeholder="Enter your birthday (YYYY-MM-DD)"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </CardGroup>

      </Col>
    </Row>
  );
}


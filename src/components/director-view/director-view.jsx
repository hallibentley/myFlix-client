import React from 'react';
import { Card, CardGroup, Button } from 'react-bootstrap';

import './director-view.scss';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card className="directorCard">
        <Card.Body>
          <Card.Title>{director.Name}</Card.Title>
          <CardGroup>
            <Card.Text>Date of Birth: {director.Birth}</Card.Text>
            <Card.Text>Date of Death: {director.Death}</Card.Text>
            <Card.Text>Bio: {director.Bio}</Card.Text>
          </CardGroup>

          <Button onClick={() => onBackClick()} variant="link">Back</Button>
        </Card.Body>
      </Card>
    );
  }
}
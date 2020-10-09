import React, { Component } from 'react';
import { Row, Button, Col,  ListGroupItem, Alert, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faList, 
  // faDotCircle 
} from '@fortawesome/free-solid-svg-icons'
// import './App.css';

class SelectedTaskList extends Component {

  render() { 
    return <ListGroupItem>
      <Row>
        <Col>
          <Alert color="dark">{this.props.task.task}</Alert>
        </Col>
        <Col md="1">
          <Button
            color="success"
            onClick={() => this.props.updateTask(this.props.task.id)}>
            <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
          <Button color="warning" onClick={() => this.props.getTasks()}>
            <FontAwesomeIcon icon={faList} />
          </Button>
          <Button
            color="info"
            onClick={() => this.props.updateTask(this.props.task.id)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Col>
      </Row>
    </ListGroupItem>
  };
};
export default SelectedTaskList;


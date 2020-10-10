import React, { Component } from 'react';
import { Row, Button, Col,  ListGroupItem, Alert, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTrash, faList, } from '@fortawesome/free-solid-svg-icons'
import EditTask from './editTask'

class SelectedTaskList extends Component {

  render() { 
    return <ListGroupItem>
      <Row>
        <Col md="11">
          <Alert color="dark">{this.props.task}</Alert>
        </Col>
        <Col md="1">
          <Button size="xs" color="warning" onClick={() => this.props.getTasks()}>
            <FontAwesomeIcon icon={faList} />
          </Button>
          <Button size="xs" color="success" onClick={() => this.props.updateTask(this.props.tasks, this.props.id)}>
            <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
          <Button size="xs" color="danger" onClick={() => this.props.deleteTask(this.props.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col>
          <EditTask 
          task={this.props.task}
          id={this.props.id}
          editTask={this.props.editTask}></EditTask>
        </Col>
      </Row>
    </ListGroupItem>
  };
};

export default SelectedTaskList;


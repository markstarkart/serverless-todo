import React, { Component } from 'react';
import { Row, Button, Col,  ListGroupItem, Alert, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faList, faCheckCircle, } from '@fortawesome/free-solid-svg-icons'
import EditTask from './editTask'

class SelectedTaskList extends Component {

  render() { 
    return <ListGroupItem>
      <Row>
        <Col md="9">
          <Alert className="task" color="dark" >{this.props.task}</Alert>
        </Col>
        <Col md="3">
          <Row>
          <Button  color="warning" onClick={() => this.props.getTasks()}>
            <FontAwesomeIcon icon={faList} />
          </Button>
          <Button  color="success" onClick={() => this.props.updateTask(this.props.tasks, this.props.id)}>
            <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
          <Button  color="danger" onClick={() => this.props.deleteTask(this.props.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          </Row>
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


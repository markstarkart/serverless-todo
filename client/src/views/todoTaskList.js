import React, {Component} from 'react';
import { Row, Button, Col,  ListGroupItem, Alert, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'


class ToDoTaskList extends Component {
  
  render() {
    return <ListGroupItem action onClick={() => this.props.selectTask(this.props.allTasks, this.props.id)}>
      <Row>
        <Col md="11">
        < Alert color="dark"
          toggle={() => this.props.updateTask(this.props.tasks, this.props.id)}>
          {this.props.task}
        </Alert>
        </Col>
        <Col md="1">
          <Row>
            <Button  color="danger" onClick={() => this.props.deleteTask(this.props.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Row>
        </Col>
      </Row>
    </ListGroupItem>
  };
};

export default ToDoTaskList;


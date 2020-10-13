import React, {Component} from 'react';
import { Row, Button, Col,  ListGroupItem, Alert, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons'


class ToDoTaskList extends Component {
  
  render() {
    return <ListGroupItem action >
      <Row>
        <Col md="10" onClick={() => this.props.selectTask(this.props.allTasks, this.props.id)}>
        < Alert className="task" color="dark" >
          {this.props.task}
        </Alert>
        </Col>
        <Col md="2">
          <Row>
            <Button  color="success" onClick={() => this.props.updateTask(this.props.tasks, this.props.id)}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </Button>
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


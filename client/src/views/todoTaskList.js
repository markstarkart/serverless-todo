import React, {Component} from 'react';
import { Row, Button, Col,  ListGroupItem, Alert, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTrash, faDotCircle } from '@fortawesome/free-solid-svg-icons'


class ToDoTaskList extends Component {
  
  render() {
    return <ListGroupItem>
      <Row>
        <Col md="11">
        < Alert color="dark">{this.props.task}</Alert>
        </Col>
        <Col md="1">
          <Button size="xs" color="warning" onClick={() => this.props.selectTask(this.props.allTasks, this.props.id)}>
            <FontAwesomeIcon icon={faDotCircle} />
          </Button>
          <Button size="xs" color="success" onClick={() => this.props.updateTask(this.props.tasks, this.props.id)}>
          < FontAwesomeIcon icon={faCheckCircle} />
          </Button>
          <br></br>
          <Button size="xs" color="danger" onClick={() => this.props.deleteTask(this.props.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Col>
      </Row>
    </ListGroupItem>
  };
};
    
export default ToDoTaskList;


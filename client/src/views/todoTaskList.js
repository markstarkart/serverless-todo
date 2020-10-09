import React, {Component} from 'react';
import { Row, Button, Col,  ListGroupItem, Alert, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, 
  // faEdit, faList, 
  faDotCircle } from '@fortawesome/free-solid-svg-icons'


class ToDoTaskList extends Component {
  
  render() {
    return <ListGroupItem>
      <Row>
        <Col>
        < Alert color="dark">{this.props.task}</Alert>
        </Col>
        <Col md="1">
          <Button color="warning" onClick={() => this.props.selectTask(this.props.allTasks, this.props.id)}>
            <FontAwesomeIcon icon={faDotCircle} />
          </Button>
          <Button color="success" onClick={() => this.props.updateTask(this.props.tasks, this.props.id)}>
          < FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </Col>
      </Row>
    </ListGroupItem>
  };
};
    
export default ToDoTaskList;


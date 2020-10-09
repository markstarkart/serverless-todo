import React, { Component } from 'react';
import { Row, Button, Col,  ListGroupItem, Alert, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faList, 
  // faDotCircle 
} from '@fortawesome/free-solid-svg-icons'


class AddTask extends Component {

  render() { 
    return <ListGroupItem> Add task
      <Row>
        <Col>
          {/* <Alert color="dark">{this.props.task.task}</Alert> */}
        </Col>
        <Col md="1">
          <Button color="info" onClick={() => this.props.addTask()}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Col>
      </Row>
    </ListGroupItem>
  };
};

export default AddTask;

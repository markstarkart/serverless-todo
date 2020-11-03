import React, { Component } from 'react';
import { 
  Button, 
  ListGroupItem,   
  InputGroup,
  InputGroupAddon,
  Input,
  } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'


class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.submitTask = this.submitTask.bind(this);
    this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  submitTask(task,addTask) {
    if (/^[^-\s][\w\s-]+$/.test(task)) {
    addTask(task)
    this.setState({value: ''});
    } 
  }

  handleEnterKeyDown(event) {
    if (event.key === 'Enter') {
      this.submitTask(this.state.value, this.props.addTask)
    }
  }



  render() { 
    return <ListGroupItem>
      <InputGroup>
        <InputGroupAddon addonType="append">
          <Button color="info" 
            onClick={() => this.submitTask(this.state.value, this.props.addTask)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          </InputGroupAddon>
        <Input 
          placeholder="Add a Task" 
          type="text" 
          value={this.state.value} 
          onChange={this.handleChange}
          onKeyDown={this.handleEnterKeyDown}
          />
      </InputGroup>
    </ListGroupItem>
  };
};

export default AddTask;

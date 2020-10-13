import React, { Component } from 'react';
import { 
  Button,  
  InputGroup,
  InputGroupAddon,
  Input,
  } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'


class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.task};

    this.handleChange = this.handleChange.bind(this);
    this.submitTask = this.submitTask.bind(this);
    this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  submitTask(id, newValue, editTask) {
    if (newValue) {
      editTask(id, newValue)
      this.setState({value: ''});
    }
  }

  handleEnterKeyDown(event) {
    if (event.key === 'Enter') {
      this.submitTask(this.props.id, this.state.value, this.props.editTask)
    }
  }


  render() { 
    return <div>
      <InputGroup>
        <InputGroupAddon addonType="append">
          <Button color="dark" onClick={() => this.submitTask(this.props.id, this.state.value, this.props.editTask)}>
            <FontAwesomeIcon icon={faEdit}/>
          </Button>
          </InputGroupAddon>
        <Input 
          placeholder="Edit Task" 
          type="text" 
          value={this.state.value} 
          onChange={this.handleChange}
          onKeyDown={this.handleEnterKeyDown}
          />
      </InputGroup>
    </div>
  };
};

export default EditTask;

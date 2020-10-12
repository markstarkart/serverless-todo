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
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({value: event.target.value});
  }
  submitTask(id, newValue, editTask) {
    console.log(id, newValue)
    if (newValue) {
      editTask(id, newValue)
      this.setState({value: ''});
    }
  }



  render() { 
    return <div>
      <InputGroup>
        <InputGroupAddon addonType="append">
          <Button color="dark" onClick={() => this.submitTask(this.props.id, this.state.value, this.props.editTask)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          </InputGroupAddon>
        <Input placeholder="Edit Task" type="text" value={this.state.value} onChange={this.handleChange}/>
      </InputGroup>
    </div>
  };
};

export default EditTask;

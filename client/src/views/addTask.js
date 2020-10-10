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
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({value: event.target.value});
  }
   submitTask(task, taskCount ,addTask) {
    addTask(task,taskCount)
    this.setState({value: ''});
  }



  render() { 
    return <ListGroupItem>
      <InputGroup>
         <InputGroupAddon addonType="append">
           <Button color="info" onClick={() => this.submitTask(this.state.value, this.props.taskCount, this.props.addTask)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          </InputGroupAddon>
        <Input placeholder="Add a Task" type="text" value={this.state.value} onChange={this.handleChange}/>
      </InputGroup>
    </ListGroupItem>
  };
};

export default AddTask;

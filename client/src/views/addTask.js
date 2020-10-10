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
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({value: event.target.value});
  }




  render() { 
    return <ListGroupItem>
      <InputGroup>
         <InputGroupAddon addonType="append">
           <Button color="info" onClick={() => this.props.addTask(this.state.value, this.props.taskCount)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          </InputGroupAddon>
        <Input placeholder="Add a Task" type="text" value={this.state.value} onChange={this.handleChange}/>
      </InputGroup>
    </ListGroupItem>
  };
};

export default AddTask;

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Button, 
  ListGroupItem,   
  InputGroup,
  InputGroupAddon,
  Input,
  } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const AddTask = (props) => {
  const [task, setTask] = useState({value: '', id: ''});

  const handleChange = (event) => {
    setTask({value: event.target.value});
  }

  const addTask = async (newTask, id) => {
    
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          task: newTask
          })
    };
    await fetch("https://rz0xzyfjwj.execute-api.us-east-1.amazonaws.com/Prod/todo", requestOptions)
      .then(response => response.json())
      .then(data => console.log('addtaskfetch', data));
  }

  const submitTask = (task) => {
    const newTask = {task, id: uuidv4()};
    if (/^[^-\s][\w\s-]+$/.test(task)) {
    addTask(newTask.task, newTask.id);
    setTask({value: '', id: ''});
    props.reSetTasks()
    } 
  }

  const handleEnterKeyDown = (event) => {
    if (event.key === 'Enter') {
      submitTask(task.value);
    }
  }

  

  return (
    <ListGroupItem>
    <InputGroup>
      <InputGroupAddon addonType="append">
        <Button color="info" 
          onClick={() => {submitTask(task.value)}}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        </InputGroupAddon>
      <Input 
        placeholder="Add a Task" 
        type="text" 
        value={task.value} 
        onChange={handleChange}
        onKeyDown={handleEnterKeyDown}
        />
    </InputGroup>
  </ListGroupItem>
  );

}
export default AddTask;

import React, { useState } from 'react';
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

function AddTask () {
  const [task, setTask] = useState({value: '', });

  function handleChange(event) {
    setTask({value: event.target.value});
  }

  async function addTask(newTask){
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          id: uuidv4(),
          task: newTask
          })
    };
    await fetch("https://rz0xzyfjwj.execute-api.us-east-1.amazonaws.com/Prod/todo", requestOptions)
      .then(response => response.json())
      .then(data => console.log('addtaskfetch', data));
  }

  function submitTask(task,addTask) {
    if (/^[^-\s][\w\s-]+$/.test(task)) {
    addTask(task);
    setTask({value: ''});
    } 
  }

  function handleEnterKeyDown(event) {
    if (event.key === 'Enter') {
      submitTask(task.value, addTask);
    }
  }

  return (
    <ListGroupItem>
    <InputGroup>
      <InputGroupAddon addonType="append">
        <Button color="info" 
          onClick={() => submitTask(task.value, addTask)}>
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

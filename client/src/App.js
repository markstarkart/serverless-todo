import React, { Component, useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Alert, } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import ToDoTaskList from './views/todoTaskList';
import SelectedTaskList from './views/selectTaskList';
import AddTask from './views/addTask';



class App extends Component {
  
  constructor(props){
    super(props);
    
    this.updateTask = this.updateTask.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.selectedTask = this.selectTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.reSetTasks = this.reSetTasks.bind(this);
    this.fetchTasks = this.fetchTasks.bind(this);
    
    this.state = {
      isLoading : false,
      tasks:[],
      renderTasks: [],
      todoTasks: [],
      completedTasks : [],
      taskSelected : false,
    };
  };
 
  async addTask(newTask){
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
    this.componentDidMount();
  }

  async editTask(id, task){
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          task: task,
          })
    };
    console.log(requestOptions)
    await fetch("https://rz0xzyfjwj.execute-api.us-east-1.amazonaws.com/Prod/todo", requestOptions)
      .then(response => response.json())
      .then(data => console.log('edittaskfetch', data));
    this.componentDidMount();
  }

  async updateTask(tasks,id){
    const task = tasks.find(task => task.id === id);
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          task: task.task,
          taskCompleted: Math.floor(Date.now() / 1000),
          })
    };
    await fetch("https://rz0xzyfjwj.execute-api.us-east-1.amazonaws.com/Prod/todo", requestOptions)
      .then(response => response.json())
      .then(data => console.log('addtaskfetch', data));
    this.componentDidMount();
  }

  async deleteTask(id){
    const requestOptions = {
        method: 'DELETE',
        body: JSON.stringify({
          id: id,
          })
    };
    await fetch("https://rz0xzyfjwj.execute-api.us-east-1.amazonaws.com/Prod/todo", requestOptions)
      .then(response => response.json())
      .then(data => console.log('edittaskfetch', data));
    this.componentDidMount();
  }

  selectTask(tasks,id){
    const selectedTask = tasks.filter(task => task.id === id);
    this.setState({ renderTasks: selectedTask, taskSelected: true });
  }

  getTasks(){
    this.setState({renderTasks: this.state.todoTasks, taskSelected: false})
  }

  async fetchTasks () {
    const repsponse = await fetch(
      "https://rz0xzyfjwj.execute-api.us-east-1.amazonaws.com/Prod/todo"
    )
    .then((data) => data.json());
    console.log('fetchAllTasks-componentDidMount', repsponse);
    const todo = await repsponse.filter((task) => !task.taskCompleted);
    const complete =  await repsponse.filter((task) => task.taskCompleted);
    await this.setState({
      tasks: repsponse,
      renderTasks: todo,
      todoTasks: todo,
      completedTasks: complete,
      isLoading: false,
      taskSelected: false,
    });
  }

  componentDidMount(){
    this.fetchTasks()
  }

  reSetTasks() {
    this.fetchTasks();
  }

  render () {
    
    if (this.state.isLoading) 
      return (<div>Loading...</div>);

      return (
        <Container>
          <Row>
            <Col className="text-center">
              <h1>Todo List</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col md="6">
                  <ListGroup className="text-center">
                    <h4>Tasks</h4>
                    <AddTask
                      reSetTasks={this.componentDidMount}
                    >
                    </AddTask>
                    {this.state.todoTasks.length ? 
                      this.state.renderTasks.length === 1 && this.state.taskSelected ? (
                        <SelectedTaskList 
                          deleteTask={this.deleteTask}
                          getTasks={this.getTasks}
                          editTask={this.editTask}
                          updateTask={this.updateTask}
                          task={this.state.renderTasks[0].task}
                          tasks={this.state.todoTasks}
                          id={this.state.renderTasks[0].id}
                        ></SelectedTaskList>
                        ) 
                      : this.state.renderTasks.map(task => 
                        <ToDoTaskList key={task.id}
                          deleteTask={this.deleteTask}
                          updateTask={this.updateTask}
                          selectTask={this.selectedTask}
                          task={task.task}
                          id={task.id}
                          tasks={this.state.todoTasks}
                          allTasks={this.state.tasks}
                        ></ToDoTaskList>
                        )
                        : (
                        <ListGroupItem>
                          <Alert color="success">All Tasks Complete!</Alert>
                        </ListGroupItem>
                        )  
                    }
                  </ListGroup>
                </Col>
                <Col md="6">
                  <ListGroup className="text-center">
                    <h4>Completed Tasks</h4>
                    {this.state.completedTasks.length === 0 ? (
                      <ListGroupItem>
                        <Alert color="danger">Get To Work!</Alert>
                      </ListGroupItem>
                    ) : this.state.completedTasks.map(task => (
                        <ListGroupItem key={task.id}><Alert className="task" color="success">{task.task}</Alert></ListGroupItem>
                      )
                    )}
                  </ListGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      );
  }
}

export default App;

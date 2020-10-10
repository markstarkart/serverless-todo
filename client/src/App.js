import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Alert, } from 'reactstrap';
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
    this.state = {
      isLoading : false,
      tasks:[],
      renderTasks: [],
      todoTasks: [],
      completedTasks : [],
    };
  };
 
  async addTask(newTask, taskCount){
    console.log(newTask, taskCount)

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          id: `id${taskCount + Math.random()}`,
          task: newTask
          })
    };
    await fetch("https://rz0xzyfjwj.execute-api.us-east-1.amazonaws.com/Prod/", requestOptions)
      .then(response => response.json())
      .then(data => console.log('addtaskfetch', data));
    this.componentDidMount();
    
  }

  async updateTask(tasks,id){
    console.log(tasks, id)
    const task = tasks.find(task => task.id === id);
    console.log(task)
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          task: task.task,
          taskCompleted: Date.now(),
          })
    };
    console.log(requestOptions)
    await fetch("https://rz0xzyfjwj.execute-api.us-east-1.amazonaws.com/Prod/", requestOptions)
      .then(response => response.json())
      .then(data => console.log('addtaskfetch', data));
    this.componentDidMount();
  }

  selectTask(tasks,id){
    console.log(tasks, id)
    const selectedTask = tasks.filter(task => task.id === id);
    console.log('selectTask()',selectedTask)
    this.setState({ renderTasks: selectedTask });
  }

  getTasks(){
    this.setState({renderTasks: this.state.todoTasks})
  }

  async componentDidMount(){
    const repsponse = await fetch(
      "https://rz0xzyfjwj.execute-api.us-east-1.amazonaws.com/Prod/"
    )
    .then((data) => data.json());
    console.log(repsponse);
    const todo = repsponse.filter((task) => !task.taskCompleted);
    const complete = repsponse.filter((task) => task.taskCompleted);
    this.setState({
      tasks: repsponse,
      renderTasks: todo,
      todoTasks: todo,
      completedTasks: complete,
      isLoading: false,
    });
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
                      addTask={this.addTask}
                      taskCount={this.state.tasks.length}
                    ></AddTask>
                    {this.state.todoTasks.length === 0 ? (
                      <ListGroupItem>
                        <Alert color="success">All Tasks Complete!</Alert>
                      </ListGroupItem>
                    ) : this.state.renderTasks.length === 1 ? (
                      <SelectedTaskList 
                        getTasks={this.getTasks}
                        updateTask={this.updateTask}
                        task={this.state.renderTasks[0]}
                        tasks={this.state.todoTasks}
                      ></SelectedTaskList>
                      ) : this.state.renderTasks.map(task => 
                        <ToDoTaskList key={task.id}
                          updateTask={this.updateTask}
                          selectTask={this.selectedTask}
                          task={task.task}
                          id={task.id}
                          tasks={this.state.todoTasks}
                          allTasks={this.state.tasks}
                        ></ToDoTaskList>
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
                        <ListGroupItem key={task.id}><Alert color="success">{task.task}</Alert></ListGroupItem>
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

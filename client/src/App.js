import React, { Component } from 'react';
import { Container, Row, Button, Col, ListGroup, ListGroupItem, Alert, ListGroupItemText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faList, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import './App.css';

class App extends Component {
  
  state = {
    isLoading : false,
    tasks:[],
    renderTasks: [],
    todoTasks: [],
    completedTasks : [],
  }
 
  updateTask(id){

    const updatedTasks = [...this.state.todoTasks].reduce((tasks, task) => {
      
      if (task.id === id) {
        tasks['completed'] = task;
        tasks["todo"] = [...this.state.todoTasks].filter(
          (task) => task.id !== id
        );
        console.log(tasks)
        return tasks;
      } else return tasks;
      }, {});
    this.setState({
      completedTasks: [...this.state.completedTasks, updatedTasks.completed],
      todoTasks: updatedTasks.todo,
      renderTasks:updatedTasks.todo,
    });
  }

  selectTask(id){
    const selectedTask = [...this.state.tasks].filter(task => task.id === id);
    console.log(selectedTask)
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
    
    const isLoading = this.state.isLoading;
    const allTasks = this.state.renderTasks;

    if (isLoading) 
      return (<div>Loading...</div>);

  let tasks =
    allTasks.length === 1 ? (
      <ListGroupItem>
        <Row>
          <Col>
            <Alert color="dark">{allTasks[0].task}</Alert>
          </Col>
          <Col md="1">
            <Button
              color="success"
              onClick={() => this.updateTask(allTasks[0].id)}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </Button>
            <Button color="warning" onClick={() => this.getTasks()}>
              <FontAwesomeIcon icon={faList} />
            </Button>
            <Button
              color="info"
              onClick={() => this.updateTask(allTasks[0].id)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
    ) : (
      allTasks.map((task) => (
        <ListGroupItem key={task.id}>
          <Row>
            <Col>
              <Alert color="dark">{task.task}</Alert>
            </Col>
            <Col md="1">
              <Button color="warning" onClick={() => this.selectTask(task.id)}>
                <FontAwesomeIcon icon={faDotCircle} />
              </Button>
              <Button color="success" onClick={() => this.updateTask(task.id)}>
                <FontAwesomeIcon icon={faCheckCircle} />
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
      ))
    );

      const completedTasks = this.state.completedTasks.map(task => <ListGroupItem key={task.id}><Alert color="success">{task.task}</Alert></ListGroupItem>)

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
                    {this.state.todoTasks.length === 0 ? (
                      <ListGroupItem>
                        <Alert color="success">All Tasks Complete!</Alert>
                      </ListGroupItem>
                    ) : (
                      tasks
                    )}
                  </ListGroup>
                </Col>
                <Col md="6">
                  <ListGroup className="text-center">
                    <h4>Completed Tasks</h4>
                    {this.state.completedTasks.length === 0 ? (
                      <ListGroupItem>
                        <Alert color="danger">Get To Work!</Alert>
                      </ListGroupItem>
                    ) : (
                      completedTasks
                    )}
                  </ListGroup>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row></Row>
        </Container>
      );
  }
}

export default App;

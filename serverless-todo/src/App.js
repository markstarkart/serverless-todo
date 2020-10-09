import React, { Component } from 'react';
import { Container, Row, Button, Col, ListGroup, ListGroupItem, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import './App.css';

class App extends Component {
  
  state = {
    isLoading : false,
    tasks: [],
    // tasks: [
    //   {
    //     "id": "id6",
    //     "task": "task6"
    //   },
    //   {
    //     "id": "id1",
    //     "task": "task1"
    //   },
    //   {
    //     "id": "id2",
    //     "task": "task2"
    //   }
    // ],
    completedTasks : [],
  }
 
  updateTask(id){

    let updatedTasks = [...this.state.tasks].reduce((tasks, task) => {
      
      if (task.id === id) {
        tasks['completed'] = task;
        tasks['todo'] = [...this.state.tasks].filter(task => task.id !== id);
        console.log(tasks)
        return tasks;
      } else return tasks;
      }, {});
    this.setState({ completedTasks : [...this.state.completedTasks, updatedTasks.completed] });
    this.setState({tasks : updatedTasks.todo});
  }

  async componentDidMount(){
    const repsponse = await fetch(
      "https://rz0xzyfjwj.execute-api.us-east-1.amazonaws.com/Prod/"
    )
    .then((data) => data.json());
    console.log(repsponse);
    const todo = repsponse.filter((task) => !task.taskCompleted);
    const complete = repsponse.filter((task) => task.taskCompleted);
    this.setState({tasks: todo, completedTasks: complete, isLoading: false});
  }

  render () {
    
    const isLoading = this.state.isLoading;
    const allTasks = this.state.tasks;

    if (isLoading) 
      return (<div>Loading...</div>);

      let tasks = allTasks.map(task => <ListGroupItem key={task.id}>
        <Row>
          <Col>
            <Alert color="dark">
              {task.task}
            </Alert>
          </Col>
          <Col md="1">
            <Button className="btn btn-sm btn-success" onClick={() => this.updateTask(task.id)}><FontAwesomeIcon icon={faCheckCircle} /></Button>
          </Col>
        </Row>
      </ListGroupItem>
      );

      const completedTasks = this.state.completedTasks.map(task => <ListGroupItem key={task.id}><Alert color="success">{task.task}</Alert></ListGroupItem>)

      return ( 

        <Container>
            <Row>
              <Col className='text-center'>
                <h1>Todo List</h1>
              </Col>
            </Row>
              <Row>
                <Col>
                  <Row>
                    <Col md="6">
                      <ListGroup className='text-center'>
                        <h4>Tasks</h4>
                        {this.state.tasks.length === 0 ? <ListGroupItem><Alert color="success">All Tasks Complete!</Alert></ListGroupItem> : tasks}
                      </ListGroup>
                    </Col>
                    <Col md="6">
                      <ListGroup className='text-center'>
                        <h4>Completed Tasks</h4>
                        {this.state.completedTasks.length === 0 ? <ListGroupItem><Alert color="danger">Get To Work!</Alert></ListGroupItem> : completedTasks}
                      </ListGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>

            <Row>
  
            </Row>
        </Container>
      );
  }
}

export default App;

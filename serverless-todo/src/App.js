import React, { Component } from 'react';
import {Table, Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import './App.css';

class App extends Component {
  
  state = {
    isLoading : false,
    tasks: [
      {
        "id": "id6",
        "task": "task6"
      },
      {
        "id": "id1",
        "task": "task1"
      },
      {
        "id": "id2",
        "task": "task2"
      }
    ],
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

  render () {
    
    const isLoading = this.state.isLoading;
    const allTasks = this.state.tasks;

    if (isLoading) 
      return (<div>Loading...</div>);

      let tasks = allTasks.map(task => <tr key={task.id}>
        <td>{task.task}</td>
        <td><Button className="btn btn-sm btn-success" onClick={() => this.updateTask(task.id)}><FontAwesomeIcon icon={faCheckCircle} /></Button></td>
      </tr>
      );

      const completedTasks = this.state.completedTasks.map(task => <tr key={task.id}><td>{task.task}</td></tr>)
      return ( 
        <div className="container border border-secondary rounded center">
          <div className="row">
            <div className="col-12">
              <h4>Todo List</h4>
            </div>
          </div>

          <div className="row">
            <div className=".col-l-12 center text-center">
              <Table dark responsive striped bordered hover>
                <thead>
                  <tr>
                    <th scope="row" colSpan="12">Task</th>
                    <th scope="row">Completed?</th>
                  </tr>
                </thead>

              <tbody>
                  {this.state.tasks.length === 0 ? <tr><td colSpan="9">All Tasks Complete!</td></tr> : tasks}
              </tbody>
              </Table>
            </div>
            <div className="row">
              <div className="col-12">
                <h4>Recently Completed List</h4>
              </div>
            </div>

            <div className="row">
              <div className=".col-l-12 center text-center">
                <Table dark responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th scope="row">Task</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.completedTasks.length === 0 ? <tr><td colSpan="9">Get To Work!</td></tr> : completedTasks}
                  </tbody>
                </Table>
              </div>

            </div>

          </div>

        </div>
      );
  }
}

export default App;

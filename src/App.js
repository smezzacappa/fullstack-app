import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import EditTodo from './components/edit-todo/edit-todo';
import CreateTodo from './components/create-todo/create-todo';
import TodoList from './components/todo-list/todo-list';

class App extends Component {
  render(){
  return (
  
    <Router>
      <div className="container">
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to='/' className="navbar-brand">MERN-Stack Todo App</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
              </ul>
        </div>
      </nav>
     
        <Route path exact='/' component={TodoList}/>
        <Route path='/create' component={CreateTodo}/>
        <Route path='/edit/:id' component={EditTodo}/>
        
      
      </div>
    </Router>
  );
  }
}

export default App;

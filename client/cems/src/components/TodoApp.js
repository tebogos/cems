import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Message from './Message'
import Footer from './Footer'


class TodoApp extends Component {
    render() {
        return (
 <Router>
 <div className="Todo-App">
   <Message />
   <TodoForm />
   <Route path='/:filter?' render={({match}) => (
       <TodoList filter={match.params.filter} />
     )} />
   <Footer />
 </div>
</Router>

    )
}
}

export default TodoApp
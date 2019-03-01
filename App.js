
//sort todo list with react-dnd plugin

import React, { Component } from 'react';
import AddForm from './components/addForm';
import List from './components/List';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import update from 'immutability-helper';


class App extends Component {
  state={
    todos:[
      {id:1,todo:'Go to supermarket'},
      {id:2,todo:'Finish homework'},
      {id:3,todo:'Watch a movie'}
    ]
  }
  //find max id from todos
  getMaxId=()=>{
    let maxid = 0;
    this.state.todos.forEach(function(item){
      if(item.id>maxid){
        maxid = item.id;
      }
    })
    return maxid;
  }
  //add new todo to the state todos list
  addTodo=(todo)=>{
    todo.id = this.getMaxId()+1;
    //console.log(todo);
    let newTodos = [...this.state.todos,todo];
    this.setState({
      todos:newTodos
    })
  }
  //remove selected todo
  deleteTodo=(id)=>{
    let newTodos = this.state.todos.filter(todo=>{
      if(todo.id !== id) return todo;
    })
    this.setState({
      todos:newTodos
    })
  }
  //draging and droping todos 
  moveTodo = (dragIndex, hoverIndex) => {
    const { todos } = this.state;
    const dragTodo = todos[dragIndex];

    this.setState(
    update(this.state, {
        todos: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragTodo]],
        },
    }),
    )
}

  render() {
    return (
      <div className="Apps">
        <div className="container">
          <div className="col-md-6 offset-md-3" style={{marginTop:"50px"}}>
            <AddForm addTodo={this.addTodo} />
            <div className="container" style={{marginTop:"20px"}}>
            {this.state.todos.map((todo,index)=>{
              return <List
                      key={todo.id}
                      index={index}
                      id={todo.id}
                      todo={todo.todo}
                      moveTodo={this.moveTodo} 
                      deleteTodo={this.deleteTodo}
                      />
            })}
            
            </div>
            
          </div>
       
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);

import React, {Component} from 'react';


class AddForm extends Component{
    //set initial state as empty
    state={todo:''};
    //send added todo to parent component
    handleSubmit=(e)=>{
       e.preventDefault();
       //console.log(this.state);
        this.props.addTodo(this.state);
        this.setState({
            todo:''
        });
    }
    //pass input value to the state
    handleChange=(e)=>{
        this.setState({
            todo:e.target.value
        });
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <h4 className="col-12 text-center text-primary">My ToDo List</h4>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Add new todos" onChange={this.handleChange} value={this.state.todo}/>
                    <div className="input-group-btn">
                        <button className="btn btn-primary" type="submit">Add</button>
                    </div>
                </div>
                
            </form>        
        )
    }
}

export default AddForm;
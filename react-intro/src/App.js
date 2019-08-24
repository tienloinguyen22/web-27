import React from 'react';
import TodoItem from './components/TodoItem';
import './App.css';

class App extends React.Component {
  state = {
    inputValue: '',
    todos: [], // {content: '', finished: true/false}
  };

  deleteTodoItem = (itemIndex) => {
    this.setState({
      todos: this.state.todos.filter((value, index) => {
        return index !== itemIndex;
      }),
    });
  };

  updateTodoItem = (itemIndex) => {
    this.setState({
      todos: this.state.todos.map((value, index) => {
        if (index === itemIndex) {
          return {
            ...value,
            finished: true,
          };
        } else {
          return value;
        }
      }),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
      content: this.state.inputValue,
      finished: false,
    };

    this.setState({
      inputValue: '',
      todos: [...this.state.todos, newTodo],
    });
  };

  handleInputChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      inputValue: newValue,
    });
  };

	render() {
		return (
			<div className="container">
				<div className="result">
          {this.state.todos.map((value, index) => {
            return (
              <TodoItem
                updateTodoItem={this.updateTodoItem}
                deleteTodoItem={this.deleteTodoItem}
                value={value.content}
                finished={value.finished}
                itemIndex={index}
                key={index}
              />
            );
          })}
        </div>

				<div className="todo-form mt-5">
					<form className="form-inline" onSubmit={this.handleSubmit}>
						<div className="form-group mb-2">
							<input
								type="text"
								readonly
                className="form-control mr-3"
                placeholder='Add a todo item ...'
                value={this.state.inputValue}
                onChange={this.handleInputChange}
							/>
						</div>
						<button type="submit" className="btn btn-primary mb-2">
							+ Add
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export default App;

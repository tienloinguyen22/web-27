import React from 'react';

// {
//   value: '123123',
//   finished: false,
//   updateTodoItem: function,
//   itemIndex: number,
// }
// condition ? true : false
const TodoItem = (props) => {
  const handleDoneClick = (event) => {
    props.updateTodoItem(props.itemIndex);
  };

  return (
    <div className='mt-2'>
      {props.finished ? <strike className='mr-3'>{props.value}</strike> : <span className='mr-3'>{props.value}</span>}
      <button className='btn btn-success mr-1' onClick={handleDoneClick}>
        Done
      </button>
      <button className='btn btn-danger' onClick={() => {props.deleteTodoItem(props.itemIndex)}}>Delete</button>
    </div>
  );
};

export default TodoItem;
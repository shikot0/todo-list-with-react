function TodoItem({setTodos, todos, todo, showNumberOfCompletedItems, saveToLocalStorage, dragStarted}) {

	function handleTodoComplete(e) {
		if(e.target.checked) {
			todo.complete = true;
		}else {
			todo.complete = false;
		}
		showNumberOfCompletedItems();
		saveToLocalStorage();
	}


	function handleDelete() {
		todos.splice(todos.indexOf(todo), 1)
		const newTodos = todos;
		setTodos([...newTodos])
		localStorage.setItem('savedTodos', JSON.stringify(todos))
	}

	return(
		<div className="todo-item" draggable onDragStart={dragStarted}>
			<input type="checkbox" className="checkbox" onChange={handleTodoComplete} checked={todo.complete ? true : false}  />
			<p>{todo.text}</p>
			<button onClick={handleDelete} className="delete-button"><img src="images/icon-cross.svg" alt="" /></button>
		</div>
	)
}

export default TodoItem;

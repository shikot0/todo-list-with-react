import {useState, useEffect} from 'react';
import TodoItem from './TodoItem';


function TodoList({todos, setTodos, saveToLocalStorage}) {
    const [showActiveTodos, setShowActiveTodos] = useState(false);
    const [showCompletedTodos, setShowCompletedTodos] = useState(false);
    const [currentMovableItem, setCurrentMovableItem] = useState(null);
    const [positionToBeMovedTo, setPositionToBeMovedTo] = useState(null);
    const [copyTodoItems, setCopyTodoItems] = useState([]);

    let [itemsLeft, setItemsLeft] = useState(0);

    function showNumberOfCompletedItems() {
        let counter = 0;
        todos.forEach(todo => {
            if(todo.complete !== true) {
                counter++;
            }
        })
        setItemsLeft(counter);
    } 

    function handleFilter(e) {
        if(document.querySelector('.selected')) {
            document.querySelector('.selected').classList.remove('selected')
        }
        if(e.target.innerText === 'All') {
            e.target.classList.add('selected')
            setShowActiveTodos(false)
            setShowCompletedTodos(false)
        }else if(e.target.innerText === 'Active') {
            e.target.classList.add('selected')
            setShowActiveTodos(true)
            setShowCompletedTodos(false)
        }else if(e.target.innerText === 'Completed') {
            e.target.classList.add('selected')
            setShowActiveTodos(false)
            setShowCompletedTodos(true)
        }
    }
    
    function dragStarted(e) {
        setCurrentMovableItem([...e.target.parentElement.childNodes].indexOf(e.target))
        setCopyTodoItems([...todos]);
    }
    
    
    function dragOver(e) {
        e.preventDefault();
        if([...e.target.parentElement.childNodes].indexOf(e.target) !== -1) {
            setPositionToBeMovedTo([...e.target.parentElement.childNodes].indexOf(e.target));
        } 
    }
    
    function dragDrop(e) {
        e.preventDefault();
        setCopyTodoItems(prevTodos => {
            prevTodos.splice(currentMovableItem, 1);
            prevTodos.splice(positionToBeMovedTo,0,todos[currentMovableItem]);
            return prevTodos
        })
        setTodos([...copyTodoItems]);
    }

    function clearCompleted() {
        setTodos(prevTodos => {
           let unfinishedTodos = prevTodos.filter(todo => {
               return todo.complete !== true;
            })
            return unfinishedTodos;
        })
    }
    
    useEffect(() => {showNumberOfCompletedItems();saveToLocalStorage()});

    return(
        <section id="todo-list">
            <div className="todo-wrapper" onDragOver={dragOver} onDragEnd={dragDrop}>
                {todos.length !== 0 && todos.filter(todo => {
                    if(showActiveTodos && !todo.complete) {
                        return todo;
                    }else if(showCompletedTodos && todo.complete) {
                        return todo;
                    }else if(!showActiveTodos && !showCompletedTodos){
                        return todo;
                    }
                    return false;
                }).map((todo, index) => {
                    return <TodoItem key={todo.id} todos={todos} index={index} setTodos={setTodos} todo={todo} showNumberOfCompletedItems={showNumberOfCompletedItems} saveToLocalStorage={saveToLocalStorage} dragStarted={dragStarted}/>
                })} 
                {todos.length === 0 && <p className="hint">Add a todo to get started</p>}
            </div>
            <footer>
                <small className="amount-of-items-left">{itemsLeft === 1 ? `${itemsLeft} item left` : `${itemsLeft} items left`}</small>
                <div className="tab-buttons">
                    <button onClick={handleFilter} className="todo-list-button selected">All</button>
                    <button onClick={handleFilter} className="todo-list-button">Active</button>
                    <button onClick={handleFilter} className="todo-list-button">Completed</button>
                </div>
                <button className="todo-list-button" onClick={clearCompleted}>Clear Completed</button>
            </footer>
        </section>
    )
}

export default TodoList;
import {useState, useEffect} from 'react';
import TodoList from './TodoList';
import {v4 as uuidv4} from 'uuid';
import './App.css';

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark-mode');
  const [currentThemeIcon, setCurrentThemeIcon] = useState('./images/icon-sun.svg');
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');


  function handleTheme() {
    if(currentTheme === 'dark-mode') {
      setCurrentTheme('light-mode');
      setCurrentThemeIcon('./images/icon-moon.svg')
      document.querySelector('main').classList.add('light-mode')
    }else {
      setCurrentTheme('dark-mode');
      setCurrentThemeIcon('./images/icon-sun.svg')
      document.querySelector('main').classList.remove('light-mode')
    }
  }

  function handleTodos(e) {
    if(e.key === 'Enter' && todoText !== '') {
      setTodos(prevTodos => {
       return  [...prevTodos, {text: todoText, complete: false, id: uuidv4()}]
      })
      setTodoText('');
    }
  }

  function saveToLocalStorage() {
    if(todos.length !== 0) {
      localStorage.setItem('savedTodos', JSON.stringify(todos))
    }
  }


  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('savedTodos'));
    if(savedTodos) {
      setTodos([...savedTodos])
    }
  },[]);


  return (
    <main>
      <header>
        <h1>TODO</h1>
        <button className="theme-switcher-button" onClick={handleTheme}><img src={currentThemeIcon} alt="" /></button>
      </header>
      <div className="todo-input-div">
        <input type="checkbox" disabled className="checkbox" />
        <input type="text" value={todoText} className="todo-input" onKeyDown={handleTodos} onChange={e => setTodoText(e.target.value)} placeholder='Create a new todo...' />
      </div>
      <TodoList todos={todos} setTodos={setTodos} saveToLocalStorage={saveToLocalStorage}/>
      <div className="drag-and-drop-hint">Drag and drop to reorder list</div>
    </main>
  );
}

export default App;

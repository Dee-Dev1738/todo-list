import React, {useState, useEffect} from "react";
import "./App.css";
import Form from "./components/Form"; //importing compents
import TodoList from "./components/TodoList"; //importing TodoList

function App() {
  //state stuff
  const [inputText, setInputText] = useState("");
  const [todos,setTodos] = useState([]);
  const[status,setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Functions & Events
  const filterHandler = () => {
    switch(status){
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }
  //Run once when the app starts
  useEffect(()=>{
    getLocalTodos();
  }, []);
  //USE EFFECT
  useEffect(() => {
  filterHandler();
  saverLocalTodos();
  }, [todos, status]);

  //Saving task
  const saverLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  //checking local storage
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    } else{
     let todoLocal = JSON.parse(localStorage.getItem('todos'));
     setTodos(todoLocal);
    }
  }



  return (
    <div className="App">
    <header>
      <h1>My Todo List</h1>
    </header>
    <Form 
      inputText={inputText} 
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText}
      setStatus={setStatus}
      
      />
    <TodoList 
    filteredTodos={filteredTodos}
    setTodos={setTodos} 
    todos={todos}
    />
    </div>
  );
}

export default App;

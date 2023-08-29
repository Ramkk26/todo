import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [newItems, setNewItems] = useState("");
  const [Todos, setTodos] = useState([]);
  const [editId,seteditId] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
   if(newItems!== ""){
    setTodos([...Todos,
      { id: uuidv4(), task: newItems, status: false,edited:false },
    ]);
    setNewItems("");
   }

   if(editId){
    const editTodo = Todos.find((todo)=>todo.id===editId)
    const updateTodo = Todos.map((to)=>to.id===editTodo.id?
    (to = {id:to.id, task: newItems }) :(to = {id:to.id, task:to.list}))
    setTodos(updateTodo);
seteditId(0)
setNewItems("")
   }

  };


  const completedTodo = (id) => {
   let complete = Todos.map((todo)=>{
    if(todo.id === id){
      return({...todo, status : !todo.status})
    } 
    return todo
   })
   setTodos(complete);
  };

  const editTodo = (id) => {

    const editItems =   Todos.find((todo) =>todo.id === id )
    setNewItems(editItems.task);
  seteditId(editItems.id)
  };
  

  const deleteTodo = (id) => {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id != id);
    });
  };






  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });



  const clearAll =()=>{
    setTodos([]);
  }
  
  const selectAll = () => {
    const allCompleted = Todos.map((todo) => {
      return { ...todo, status: true };
    });
    setTodos(allCompleted);
  };

  
  
  
  
  return (
    <div className="form">
      <form className="make-it-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What is your task?"
          ref={inputRef}
          value={newItems}
          onChange={(e) => setNewItems(e.target.value)}
        />
        <button className="add-btn" onClick={addTodo}>
     {editId?"UPDATE" :"ADD "}
        </button>
      </form>
      <h3 className="header-list">TODO LISTS</h3>
      <ul className="make-it-grid">
        <span className="task">{Todos.length === 0 ? "No Task" : " "}</span>
        {Todos.map((todo) => (
          <div className="make-it-flex">
          <li className="" key={todo.id} id={todo.status?"list-item":""}>
            {todo.task}
            </li>
            <span >
          
              <i className="fa-solid fa-check" onClick={()=>completedTodo(todo.id)}></i>{" "}
              <i className="fa-solid fa-pen-to-square" onClick={()=>editTodo(todo.id)}></i>{" "}
              <i
                className="fa-solid fa-trash"
                onClick={() => deleteTodo(todo.id)}
              ></i>
            </span> 
      
          </div>
        ))}
        
      </ul>
   <div className="flex-it">
      <span className="clear" onClick={selectAll}>{Todos.length !== 0 ? "Select All" : ""}</span>
      <span className="clear" onClick={clearAll}>{Todos.length !== 0 ? "Clear all" : ""}</span>
      </div>
    </div>
  );
}

export default App;

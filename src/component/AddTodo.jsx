import React, {useEffect, useRef, useState} from 'react'

export const AddTodo = ({addTodo,setTodos }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();
        if (value) {
       
          addTodo(value);
        
          setValue('');
        }
      };
      const inputRef = useRef('null');
       useEffect(()=>{
        inputRef.current.focus();
      })

   
     
  return (
    <>
    <form onSubmit={handleSubmit} className="TodoForm" >
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='What is the task today?' ref={inputRef} />
    <button type="submit" className='todo-btn'>Add Task</button>
  </form>
 
  </>
  )
}

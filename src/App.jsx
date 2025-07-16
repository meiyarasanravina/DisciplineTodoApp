import { useEffect, useReducer, useState } from 'react'
import './App.css'
 function reducer(state,action){
    switch(action.type){
      case  'Add':
      return [...state,{id:Date.now(),
        text: action.playload,
        complete:false}];
        case 'Toggle':
          return state.map((todo)=>
        todo.id === action.playload ? {...todo, complete: !todo.complete} : todo
    );
       case 'delete':
        return state.filter((todo)=>
         todo.id !== action.playload 
        );

        case 'clearComplete':
          return state.filter((todo)=>
            !todo.complete
          )
         default :
          return state
    }

 }
function App() {
 const initialState =  JSON.parse(localStorage.getItem('todos')) || [];
  const [state,dispatch] =useReducer(reducer,initialState);
  //   const [todos,setTodos] = useState( 
  //    JSON.parse(localStorage.getItem('todos')) || []
   
  // );
  // const [todos,setTodos] = useState(
  //   JSON.parse(localStorage.getItem('todos')) || [] )
   

  const [inputValue,setInputValue]=useState('');

  const [filter,setFilter]=useState('all');

   useEffect(()=>{
     localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  const handleChaneInupt = (event)=>{
     setInputValue(event.target.value)
  }
   
  const handleAddValue = (e) => {
    e.preventDefault(); // Prevents the page from reloading on form submit
     if (inputValue.trim() === '') return; // Don't add empty todos
     dispatch({type:'Add',playload:inputValue})
    // const newTodo = {
    //   id: Date.now(), // Unique ID based on the current time
    //   text: inputValue,
    //   completed: false,
    // };
    // setTodos([...todos, newTodo]); // Add the new todo to the existing list
    setInputValue(''); // Clear the input field
  };
  
//  const handleToggleComplete = (id)=>{
//    setTodos(
//     todos.map((todo)=>
//         todo.id === id ? {...todo, complete: !todo.complete} : todo
//     )
//    );
//  };

//  const handleDeleteTodo = (id)=>{
//      setTodos(todos.filter((todo)=> todo.id !== id))
//  };

// const handleClearComplete = ()=>{
//   setTodos(todos.filter((todo)=> !todo.complete))
// }

 const filteredTodos = state.filter((todo)=>{
   if(filter === 'active') return !todo.complete;
   if(filter === 'complete') return todo.complete;
   return true; 
 });

 console.log(filteredTodos);
 
 
  return (
    <main className='Todo-container'>
      <header>
        <h1>DisciplineTo-Do App</h1>
      </header>
     
     <form onSubmit={handleAddValue}>
      <input className='input-box'
      placeholder=' What needs to be done?' 
      type='text'
      value={inputValue}
      onChange={handleChaneInupt}
      />
      <button className='Add-box' type='submit'>
      Add</button>
     </form>
     
    <ul className='todo-list'>
      {  filteredTodos.length > 0 ? (
      filteredTodos.map((todo)=>(
         <li className={`Todo-items ${todo.complete ? 'complete' :' '}`}
         key={todo.id}>
               <div className='ok-button' 
               onClick={()=>dispatch({type:'Toggle',playload:todo.id})}>
                    
               </div>
               <span className='text-value'
               onClick={()=>dispatch({type:'Toggle',playload:todo.id})}>
                   {todo.text}
               </span>
               <button className='delete-button'
               onClick={()=>dispatch({type:'delete',playload:todo.id})}>
                 ×
               </button>
         </li>
      ))

      ) : 
      (
        <div className='empty-list'>
           <p>Your list is empty. Add a task to get started!</p>
        </div>
      )
}       
    </ul>

  {state.length > 0 && (
   <footer className='footer'>
   <span className='items-list'>{state.filter(todo => !todo.complete).length} items Count</span>
   <div className='filter-button'>
    <button className={filter === 'all' ? 'active' : ''} onClick={()=> setFilter('all')}> ALL</button>
   <button className={filter === 'active' ? 'active' : ''} onClick={()=> setFilter('active')}> Active</button>
   <button className={filter === 'complete' ? 'active' : ''} onClick={()=> setFilter('complete')}> Completed</button>
   </div>
   <button className='clear-button '
      onClick={()=>dispatch({type:'clearComplete'})}
 > Clear Completed
  </button>
   </footer>
  )}
    </main>
  
  )}

export default App

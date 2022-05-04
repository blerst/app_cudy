import React from 'react';
import './App.css';

//4 May 2022, 14:20

function App() {
  //This const is creating the hook that will be used for the todos. The useState will give us the ability to create the todo array
  const [todos, setTodos] = React.useState([])
  //This const exists as the temp variable for todos that are added before saved in a file.
  const [todo, setTodo] = React.useState("")

  function handleSubmit(e) {
    //This prevents the webpage from reloading whenever the "Add Todo" button is pushed
    e.preventDefault()

    //This is how the todos will be stored
    const newTodo = {
      id: Date.now(),
      text: todo,
      completed: false,
    }

    setTodos([...todos].concat(newTodo))

    //This line resets the text box to be empty
    setTodo("")
  }

  return (
    /*
    The form of this div is where the "add todo" option will be

    For the onChange variable, think of the 'e' as representing the event
    sort of like how you would view increments with 'i'
    When you use a button, the user input gets recorded as 'e' and can be saved using 'e'
    */
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo}/>
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => <div>{todo.text}</div>)}
    </div>
  );
}

export default App;

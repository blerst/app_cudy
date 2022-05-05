import React from 'react';
import './App.css';

//4 May 2022, 14:20
//Whenever you see <div>, I have commented around them the features about the div because you can't comment in a div.

function App() {
  //This const is creating the hook that will be used for the todos. The useState will give us the ability to create the todo array
  const [todos, setTodos] = React.useState([])
  //This const exists as the temp variable for todos that are added before saved in a file.
  const [todo, setTodo] = React.useState("")

  //This function is for adding todos (hence handleSubmit as it handles the user input)
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

  //The purpose of this function is to toggle variable of whether the todo is completed or not
  function toggleComplete(id) {
    const updateTodo = [...todos].map((todo) => {
      //If the checkbox is changed, change the value to the opposite of what it is (in the variable)

      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      //While this will return all the todos in the array, it will only modify one
      return todo
    })

    setTodos(updateTodo)

  }


  //The purpose of this function is to delete todos
  function deleteTodo(id) {
    //The todo id is passed into this function so the delete button knows which todo to remove

    const updateTodo = [...todos].filter((todo) => todo.id !== id) 
    //Filter operates as an array function (similar to map below)

    setTodos(updateTodo)
    //This function will update the todo array with the updated version once a function is removed.

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
      {todos.map((todo) => <div key={todo.id}>
        <div>{todo.text}</div>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        <input 
          type="checkbox" 
          onChange ={() => toggleComplete(todo.id)}
          checked={todo.completed} />
      </div>)}
    </div>
    //The todos.map allows for elements (like buttons) to be added. For example the remove todo feature
    //The key inside the map div allows us to ensure that each identifier once on screen is unique.
    //The onClick handle in the deleteButton allows for a function to execute on click.
    //Checked is a bool value which will change the variable of a todo based on the checked status


  );
}

export default App;

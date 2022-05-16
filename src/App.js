import React from 'react';
import './App.css';

//Whenever you see <div>, I have commented around them the features about the div because you can't comment in a div.

function App() {

  //A hook is essentially a react function without a class imported from react which has different uses (like doing an event on reload of page)

  //This const is creating the hook that will be used for the todos. The useState will give us the ability to create the todo array
  const [todos, setTodos] = React.useState([])
  //This const exists as the temp variable for todos that are added before saved in a file.
  const [todo, setTodo] = React.useState("")
  //This const exists to add a hook for todo editing. 
  const [todoEditing, setTodoEditing] = React.useState(null)
  //This const keeps track of edited text
  const [editingText, setEditingText] = React.useState("")

  //Pulls the local storage
  const temp = localStorage.getItem("todos")
  const loadedTodos = JSON.parse(temp)
  
  //Shows the user the todos
  React.useEffect(() => {
    setTodos(loadedTodos)
  }, [])

  //This function allows for the local storage of todos
  React.useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos])
  
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

    if (todo) {
      setTodos([...todos].concat(newTodo))
    }

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



  //This function will be used to edit the todo file once changes have been made by the user
  function editTodo(id) {
  
    //If the edited todoid matches the id in the file, change the file to match todo
    const updateTodos = [... todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText
      }
      return todo
    })
    setTodos(updateTodos)
    setTodoEditing(null)
    setEditingText("")
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
    The form of this div is where all the elements shown to the user are stored

    For the onChange variable, think of the 'e' as representing the event
    sort of like how you would view increments with 'i'
    When you use a button, the user input gets recorded as 'e' and can be saved using 'e'

    The todos.map allows for elements (like buttons) to be added. For example the remove todo feature
    
    The key inside the map div allows us to ensure that each identifier once on screen is unique.
    
    The onClick handle in the deleteButton allows for a function to execute on click.
    
    Checked is a bool value which will change the variable of a todo based on the checked status

    todoEditing === todo.id ? represents conditional rendering where whichever todo is being edited, it will display a box for input
    otherwise it will remain the same essentially it exist to choose which boxes the user needs to see
    */


    <div className="App">

      <h1>What's on your mind?</h1>

      <form onSubmit={handleSubmit}>

        <input 
          type="text" 
          onChange={(e) => setTodo(e.target.value)} 
          value={todo}
          className="inputTodo"/>

        <button type="submit" className="addTodo">Add Todo</button>
      </form>
      
        {todos.map((todo) => <div 
        className={todo.completed ? 'completed' : ''}
        key={todo.id}>
        
        {todoEditing === todo.id ? 
        (<input 
          type="text" 
          onChange={(e) => setEditingText(e.target.value)} 
          value={editingText} 
        />) 
          :
          (<div className="todoText">{todo.text}</div>)}
        

        <button className="delButton" onClick={() => deleteTodo(todo.id)}>Delete</button>
        
        <input 
          type="checkbox"
          className="isComplete" 
          onChange ={() => toggleComplete(todo.id)}
          checked={todo.completed} />

        {todoEditing === todo.id ? 
        (<button className="editTodo" onClick={() => editTodo(todo.id)}>Complete Edit</button>) : 
        (<button className="editTodo" onClick={() => setTodoEditing(todo.id)}>Edit</button>)}

      </div>)}
    </div>
  );
  }
export default App;

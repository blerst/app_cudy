import React from 'react';
import './App.css';
import img1 from './images/cudy1.png';

//Whenever you see <div>, I have commented around them the features about the div because you can't comment in a div.

function App() {

  //Hooks are functions that let you “hook into” React state and lifecycle features from function components. They allow you to use React without classes

  //This const is creating the hook that will be used for the todos. The useState will give us the ability to create the todo array
  const [todos, setTodos] = React.useState([])

  //This const exists as the temp variable for todos that are added before saved in a file. This is done with the help of the useState hook
  const [todo, setTodo] = React.useState("")

  //This const exists to save the todos to file using the useState hook
  const [todoEditing, setTodoEditing] = React.useState(null)

  //This const keeps track of edited text with the useState hook
  const [editingText, setEditingText] = React.useState("")

  //Pulls the todo file from local storage
  const temp = localStorage.getItem("todos")

  //This is parsed into javascript from json which is how the todo file is stored and puts it into loadedTodos
  const loadedTodos = JSON.parse(temp)
  
  //Shows the user the todos upon reload of the page
  React.useEffect(() => {
    setTodos(loadedTodos)
  }, [])

  //This function allows for the local storage of todos
  React.useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos])
  
  //This function is for adding todos and is triggered by the "add todo" button
  function handleSubmit(e) {

    //Stops the page from reloading every time a todo is added
    e.preventDefault()
    
    //This is how the todos will be stored. This is called an "object" and acts like a record
    const newTodo = {
      id: Date.now(),
      text: todo,
      completed: false,
    }

    //This code stores the todo in file. The .concat allows for the new todo object to be added to the end of the file.
    if (todo) {
      setTodos([...todos].concat(newTodo))
    }

    //This line resets the text box to be empty once a todo is added
    setTodo("")

  }

  //The purpose of this function is to toggle the 'complete' variable and determine whether the todo is completed or not
  function toggleComplete(id) {

    //Update todo will access the todo file and with the arrow function (=>) (which can be thought of as a "I've opened the file, what do you want to do with it")
    const updateTodo = [...todos].map((todo) => {

      //If the todo.id matches the id in the file, change the todo.completed to the opposite of what it currently is
      if (todo.id === id) {
        todo.completed = !todo.completed
      }

      //Return all changes to system (Kind of like pushing with git to github)
      return todo
    })

    //The todos file will be updated to what has changed
    setTodos(updateTodo)

  }

  //This function will be used to edit the todo file once changes have been made by the user
  function editTodo(id) {

    //Const exists to access the todo file and update it with the edited changes
    const updateTodos = [... todos].map((todo) => {
      
      //This if statement checks whether there is any edit in the edit todo textbox. If there is not, there will be no change
      if (editingText) {
        
        //If the edited todoid matches the id in the file, change the file to match todo
        if (todo.id === id) {
          todo.text = editingText
        }
      }

      //Return all changes to system (Kind of like pushing with git to github)
      return todo
    })

      //This resets the textbox and all the variables to default.
      setTodos(updateTodos)
      setTodoEditing(null)
      setEditingText("")
  }

  //The purpose of this function is to delete todos
  function deleteTodo(id) {

    //The todo id is passed into this const so that the correct todo can be removed from the file
    const updateTodo = [...todos].filter((todo) => todo.id !== id) 

    //This function will update the todo array with the updated version once the todo is removed.
    setTodos(updateTodo)

    }

  return (

    <div className="App">

      <img src={img1} alt=''/>

      <form onSubmit={handleSubmit}>

        <input 
          type="text" 
          onChange={(e) => setTodo(e.target.value)} 
          value={todo}
          placeholder='What do you need to do?'
          className="inputTodo"/>

        <button type="submit" className="addTodo">Add Todo</button>
      </form>
      
        {todos.map((todo) => 
        <div className={todo.completed ? 'completed' : ''}
        key={todo.id}>
        
        {todoEditing === todo.id ? 
        (<input 
          type="text" 
          placeholder={todo.text}
          onChange={(e) => setEditingText(e.target.value)} 
          value={editingText} 
        />) 
          :
          (<div className="todoText">{todo.text}</div>)}
        

        {todoEditing === todo.id ?
        (console.log):
        (<button className="delButton" onClick={() => deleteTodo(todo.id)}>Delete</button>)}
        
        {todoEditing === todo.id ?
        (console.log) :
        (<input 
          type="checkbox"
          className="isComplete" 
          onChange ={() => toggleComplete(todo.id)}
          checked={todo.completed} />)}


        {todoEditing === todo.id ? 
        (<button className="editTodo" onClick={() => editTodo(todo.id)}>Complete Edit</button>) : 
        (<button className="editTodo" onClick={() => setTodoEditing(todo.id)}>Edit</button>)}

      </div>)}
    </div>
  );
  }
  
  /*
  <img src={img1} alt=''/>
  - This code puts the CUDY logo on screen

  <form onSubmit={handleSubmit}>
  - This code reads what is put into the 'What do you need to do?' textbox

  <button type="submit"
  - This button adds the todo in the add todo text box to be saved to local storage

  {todos.map((todo) => 
  - This code displays all of the todos under the add todo box. The code underneath acts as a if statement which 
    checks whether the todo is complete n order to determine whether to cross out the todo

  {todoEditing === todo.id ? 
  - This code acts as an if statement to check whether a todo is being edited in order to determine whether the edit box
    needs to be shown or hidden with the todo taking it's place. If the todo is being edited, the textbox will record all
    input and save it into a placeholder variable (named editingText)

  <input type="checkbox"
  - This code is a checkbox which can be ticked in order to change a todo to 'completed'. When there is a change in the checkbox status, it calls the
    toggleComplete function, changing the todo file for whether a todo is completed or not completed

  {todoEditing === todo.id ? 
  - This code acts as a if statement of whether a 'edit todo' button should be shown or 'complete todo' button. It also hides the checkbox and delete todo button if being edited

  <button className="delButton"
  - This button deletes a todo by calling the deleteTodo function, passing the todo.id so that the function knows which todo to delete from file

  <button className="editTodo"
  - This button calls either the editTodo function if the button is the 'complete edit' button or the setTodoEditing function if the button is
    the 'edit' button

  */
  
export default App;
//This line is basic React structure to display the app
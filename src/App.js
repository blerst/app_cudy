import React from 'react';
import './App.css';
import img1 from './images/cudy1.png';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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

  const current = new Date()

  const today_date = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`;

  const [selectedDate, setSelectedDate] = React.useState(null)

  const [editSelectedDate, editSetSelectedDate] = React.useState(null)

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

    //This function will remove the fluff that comes with the selectedDate function
    if (selectedDate) {
      var dueDate = selectedDate.toString()
      dueDate = dueDate.replace("00:00:00 GMT+1000 (Australian Eastern Standard Time)","")
    } else {
      dueDate = "No due date"
    }

    //This is how the todos will be stored. This is called an "object" and acts like a record
    const newTodo = {
      id: Date.now(),
      text: todo + " | " + dueDate,
      editText: todo,
      overdue: true,
    }

    //This code stores the todo in file. The .concat allows for the new todo object to be added to the end of the file.
    if (todo) {
      setTodos([...todos].concat(newTodo))
    }

    //This line resets the text box to be empty once a todo is added
    setTodo("")

    setSelectedDate("")

  }

  //This function will be used to edit the todo file once changes have been made by the user
  function editTodo(id) {

    //Const exists to access the todo file and update it with the edited changes
    const updateTodos = [... todos].map((todo) => {

      //This if statement checks whether there is any edit in the edit todo textbox. If there is not, there will be no change
      
      if (editingText && editSelectedDate) {
        if (todo.id === id) {
          var dueDate1 = editSelectedDate.toString()
          dueDate1 = dueDate1.replace("00:00:00 GMT+1000 (Australian Eastern Standard Time)","")
          var modTodo1 = editingText + " | " + dueDate1
          todo.text = modTodo1
        }

      } else if (editingText) {
          if (todo.id === id) {
            var tempTodo1 = todo.text
            var todoDate = tempTodo1.substring(tempTodo1.indexOf("|"));
            var modTodo2 = editingText + " " + todoDate
            todo.text = modTodo2
          }
      } else if (editSelectedDate) {
          if (todo.id === id) {
            var tempTodo = todo.text
            var tempText = tempTodo.substring(0, tempTodo.indexOf('|'));
            var dueDate2 = editSelectedDate.toString()
            dueDate2 = dueDate2.replace("00:00:00 GMT+1000 (Australian Eastern Standard Time)","")
            var modTodo3 = tempText + " | " + dueDate2
            todo.text = modTodo3
          }
      }

      //Return all changes to system (Kind of like pushing with git to github)
      return todo
    })

      //This resets the textbox and all the variables to default.
      setTodos(updateTodos)
      setTodoEditing(null)
      setEditingText("")
      editSetSelectedDate("")
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

      <h4>The date today is <b>{today_date}</b></h4>

      <form onSubmit={handleSubmit}>

        <input 
          type="text" 
          onChange={(e) => setTodo(e.target.value)} 
          value={todo}
          placeholder='What do you need to do?'
          className="inputTodo"/>

        <DatePicker 
        className='dateChoose'
        placeholderText='Enter a date'
        selected={selectedDate} 
        onChange={date => setSelectedDate(date)} 
        />

        <button type="submit" className="addTodo">Add Todo</button>
      </form>
      
        {todos.map((todo) =>
        <div className={todo.overdue ? 'overdueText' : 'ontimeText'}
        key={todo.id}>
        
        {todoEditing === todo.id ? 
        (<input 
          type="text" 
          placeholder={todo.text}
          onChange={(e) => setEditingText(e.target.value)} 
          value={editingText} 
        />
        ) 
          :
          (<div>{todo.text}</div>)}

        {todoEditing === todo.id ? 
        (<DatePicker
        placeholderText='Enter a date'
        className='dateEdit'
        selected={editSelectedDate} 
        onChange={date => editSetSelectedDate(date)} 
        />)
        :
        (console.log())}


        {todoEditing === todo.id ? 
        (<button className="completeEdit" onClick={() => editTodo(todo.id)}>Complete Edit</button>) : 
        console.log()}
  
        <div>
          {todoEditing === todo.id ?
            (console.log):
            (<button className="delEdit" onClick={() => deleteTodo(todo.id)}>Done?</button>)}

          {todoEditing === todo.id ?
            (console.log):
            (<button className="delEdit" onClick={() => setTodoEditing(todo.id)}>Edit</button>)}
        </div>

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
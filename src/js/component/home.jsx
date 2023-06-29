import React, { useEffect, useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mitr", {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        console.log(resp.ok); 
        console.log(resp.status); 
        console.log(resp.text()); 
        return resp.json(); 
      })
      .then(data => {
        console.log(data); 
      })
      .catch(error => {
        console.log(error); 
      });
  }, []);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mitr")
      .then(resp => resp.json())
      .then(data => setTodos(data))
      .catch(error => console.log(error));
  }, []);

  const addTodo = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTodos([...todos, { label: inputValue, done: false }]);
      setInputValue("");
      fetch("https://assets.breatheco.de/apis/fake/todos/user/mitr", {
      method: "PUT",
      body: JSON.stringify(addTodo),
      headers: {
        "Content-Type": "application/json"
      }
    })
    }
  };

  const deleteTodo = index => {
    const updatedTodos = todos.filter((_, currentIndex) => index !== currentIndex);
    setTodos(updatedTodos);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mitr", {
      method: "PUT",
      body: JSON.stringify(updatedTodos),
      headers: {
        "Content-Type": "application/json"
      }
    })
  };

  const deleteAll = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mitr", {
      method: "DELETE"
    })
      .then(resp => resp.json())
      .then(data => setTodos([]))
      .catch(error => console.log(error));
  };

  return (
	    <div className="container">
		    <h1>My Todo List 📝</h1>
            <ul>
              <li>
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={addTodo} 
                  placeholder="Tasks To Be Done"></input>
              </li>
                {todos.map((task, id) => (
              <li key={id}>
                {task.label}{" "}
                <i className="fas fa-trash-alt"
                  onClick={() =>
                    deleteTodo(id)																	
                  }></i>
              </li>
              ))
              }
            </ul>
  		  <div>{todos.length===0 ? <h4>No tasks, add one!</h4> : <h5>You have {todos.length} tasks to complete</h5>}</div>
		      <button onClick={ () => deleteAll()}>Delete All Todos ⚠️</button> 
	  </div>
  );
  };

export default Home;

/*fetch("https://assets.breatheco.de/apis/fake/todos/user/mitr", {
      method: "PUT",
      body: JSON.stringify([ ]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        console.log(resp.ok); 
        console.log(resp.status); 
        console.log(resp.text()); 
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error); 
      });*/
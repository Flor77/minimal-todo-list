import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [currentTask, setCurrentTask] = useState("");

  const inputTask = useRef(null);

  const addTask = () => {
    setTodoList([...todoList, { task: currentTask, completed: false }]);
    inputTask.current.value = "";
    setCurrentTask("");
  };

  const deleteTask = (taskToDelete) => {
    setTodoList(
      todoList.filter((task) => {
        return task.task !== taskToDelete;
      })
    );
  };

  const completeTask = (taskToComplete) => {
    setTodoList(
      todoList.map((task) => {
        return task.task === taskToComplete
          ? { task: taskToComplete, completed: true }
          : { task: task.task, completed: task.completed ? true : false };
      })
    );
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        ref={inputTask}
        type="text"
        onKeyDown={(e) => {
          if (e.keyCode === 13) addTask();
        }}
        placeholder="Task..."
        onChange={(e) => {
          setCurrentTask(e.target.value);
        }}
      ></input>
      <button onClick={addTask}>Add Task</button>
      <hr style={{ color: "blue" }} />
      {todoList.map((val, key) => {
        return (
          <ul>
            <div id="task">
              <li key={key}>{val.task}</li>
              <button
                onClick={() => {
                  completeTask(val.task);
                }}
              >
                Completed
              </button>
              <button
                onClick={() => {
                  deleteTask(val.task);
                }}
              >
                X
              </button>
              {val.completed ? (
                <h1>Task Completed</h1>
              ) : (
                <h1>Task Not Completed</h1>
              )}
            </div>
          </ul>
        );
      })}
    </div>
  );
}

export default App;

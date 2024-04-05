import { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import MapComponent from './components/MapComponent';



function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App(props) {

  const [location, setLocation] = useState({ latitude: null, longitude: null });


  const geoFindMe = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, () => {
      console.log("无法获取您的位置");
    });
  };
  

    const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
    console.log(`Latitude: ${latitude}°, Longitude: ${longitude}°`);
    console.log(`Try here: https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
    locateTask(lastInsertedId, {
    latitude: latitude,
    longitude: longitude,
    error: "",
    });
    };
    const error = () => {
    console.log("Unable to retrieve your location");
    };
  function usePersistedState(key, defaultValue) {
    const [stack, setState] = useState(
      () => JSON.parse(localStorage.getItem(key)) || defaultValue,
    );

    useEffect(() => {
      // 检查浏览器是否支持 Geolocation API
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          // 成功回调
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          // 错误回调
          (error) => {
            console.error("Error Code = " + error.code + " - " + error.message);
            // 可以根据需要设置默认位置或处理错误
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
        // 浏览器不支持 Geolocation API 时的处理
      }
    }, []);

    return [stack, setState];
  }

  const [tasks, setTasks] = usePersistedState("tasks", []);
  // const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  const [lastInsertedId, setLastInsertedId] = useState("");

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // Copy the task and update its name
        return { ...task, name: newName };
      }
      // Return the original task if it's not the edited task
      return task;
    });
    setTasks(editedTaskList);
  }

  function locateTask(id, location) {
    console.log("locate Task", id, " before");
    console.log(location, tasks);
    const locatedTaskList = tasks.map((task) => {
    // if this task has the same ID as the edited task
    if (id === task.id) {
    //
    return { ...task, location: location };
    }
    return task;
    });
    console.log(locatedTaskList);
    setTasks(locatedTaskList);
   }

  function photoedTask(id) {
    console.log("photoedTask", id);
    const photoedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, photo: true };
      }
        return task;
    });
    console.log(photoedTaskList);
    setTasks(photoedTaskList);
  }

  const taskList = tasks
    ?.filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        location={task.location}
        latitude={task.location.latitude}
        longitude={task.location.longitude}
        toggleTaskCompleted={toggleTaskCompleted}
        photoedTask={photoedTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const id = "todo-" + nanoid();
    const newTask = {
    id: id,
    name: name,
    completed: false,
    location: { latitude: "##", longitude: "##", error: "##" },
    };
    setLastInsertedId(id);
    setTasks([...tasks, newTask]);
    }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
    <h1>Geo TodoMatic</h1>
    <Form addTask={addTask} geoFindMe={geoFindMe} />{" "}
    <div className="filters btn-group stack-exception">{filterList}</div>
    <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
    {headingText}
    </h2>
    <ul
    aria-labelledby="list-heading"
    className="todo-list stack-large stack-exception"
    role="list"
    >
    {taskList}
    </ul>
    </div>
   );

   
   return (
    <div>
      <h1>Current Location</h1>
      {location.latitude && location.longitude ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p>Locating...</p>
      )}
    </div>
  );


   return (
    <div className="todoapp stack-large">
      {/* ... 其他组件 ... */}
      <MapComponent location={location} />
      {/* ... 其他组件 ... */}
    </div>
  );
  
}

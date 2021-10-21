import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import TasksList from './components/TasksList/TasksList';
import Modal from './components/Modal/Modal';
import TasksForm from './components/TasksForm/TasksForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isTasks, setIsTasks] = useState(false);
  const [savedTaskIndex, setSaveTaskIndex] = useState(null);
  const [btnName, setBtnName] = useState('Create');

  useEffect(() => {
    if (tasks.length) {
      setIsTasks(true);
    }else{
      setIsTasks(false);
    }
  }, [tasks])

  return (
    <div className="App">
      <NavBar />
      <Modal
        visible={modalVisible}
      >
        <TasksForm
          setTasks={setTasks}
          tasks={tasks}
          setVisible={setModalVisible}
          btnName={btnName}
          index={savedTaskIndex}
          setBtnName={setBtnName}
          setSaveTaskIndex={setSaveTaskIndex}
        />
      </Modal>
      <div className="content__conteiner">
        <button className="btn__addTask" onClick={() => {setModalVisible(true); setBtnName("Create")}}>Add Task</button>
        {isTasks
          ?
          <TasksList
            tasks={tasks}
            btnName={"Save"}
            setModalVisible={setModalVisible}
            setBtnName={setBtnName}
            setSaveTaskIndex={setSaveTaskIndex}
            setTasks={setTasks}
          />
          : 
          <h1 style={{ textAlign: "center" }}>Завдань немає</h1>
        }
      </div>
    </div>
  );
}

export default App;

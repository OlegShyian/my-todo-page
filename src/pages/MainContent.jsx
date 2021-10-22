import React from 'react'
import { useState } from 'react';
import TasksList from '../components/TasksList/TasksList';
import Modal from '../components/Modal/Modal';
import TasksForm from '../components/TasksForm/TasksForm';

const MainContent = () => {
    const [tasks, setTask] = useState([]);
    const [idEditTask, setIndexEditTask] = useState(undefined);
    const [btnName, setBtnName] = useState('Create');
    
    return (
        <>
            {idEditTask
                ?
                <Modal>
                    <TasksForm
                        setTask={setTask}
                        tasks={tasks}
                        setIndexEditTask={setIndexEditTask}
                        btnName={btnName}
                        taskId={idEditTask}
                        setBtnName={setBtnName}
                    />
                </Modal>
                :
                null
            }

            <div className="content__conteiner">
                <button className="btn__addTask" onClick={() => { setIndexEditTask(tasks.length + 1); setBtnName("Create") }}>Add Task</button>
                {tasks.length
                    ?
                    <TasksList
                        tasks={tasks}
                        btnName={"Save"}
                        setIndexEditTask={setIndexEditTask}
                        setBtnName={setBtnName}
                        setTask={setTask}
                    />
                    :
                    <h1 style={{ textAlign: "center" }}>Завдань немає</h1>
                }
            </div>
        </>
    )
}

export default MainContent

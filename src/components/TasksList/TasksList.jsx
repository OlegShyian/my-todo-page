import React from 'react'
import cl from "./style.module.css"


const TasksList = ({ tasks, setBtnName, setModalVisible, setSaveTaskIndex, setTasks }) => {

    const openCurenTask = (index) => {
        console.log(index);
        setModalVisible(true);
        setSaveTaskIndex(index);
        setBtnName("Save");
    }

    const removeCurrentTask  = (index) => {
        const question = window.confirm("After press 'Remove' you completely remove your task, are you sure?")
        if(question){
            setTasks(tasks.filter((el, ind) => ind !== index));
        }
    }

    return (
        <ul>
            <li className={cl.list__titles}>
                <div>#</div>
                <div className={cl.second__element}>Task Name</div>
                <div>Status</div>
                <div>Edit</div>
                <div>Remove</div>
            </li>
            <hr style={{ margin: "5px 10px", background: "black" }} />
            {tasks.map((task, ind) =>
                <li key={ind} className={cl.list__titles}>
                    <div>{ind + 1}</div>
                    <div className={cl.second__element}>{task.name}</div>
                    <div>{task.status}</div>
                    <div>
                        <button
                            onClick={() => openCurenTask(ind)}
                        >Edit</button>
                    </div>
                    <div><button
                        onClick={() => removeCurrentTask(ind)}
                    >Remove</button></div>
                </li>)}

        </ul>
    )
}

export default TasksList

import React, { useEffect, useState } from 'react'
import cl from "./style.module.css"

const TasksForm = ({ setTasks, tasks, setVisible, btnName, index, setSaveTaskIndex }) => {
    const [taskName, setTaskName] = useState("");
    const [taskStatus, setTaskStatus] = useState("");

    useEffect(() => {
        if (index || index === 0) {
            setTaskName(tasks[index].name);
            setTaskStatus(tasks[index].status);
        }
    }, [index, tasks]);


    const handleSetTask = (e) => {
        e.preventDefault();

        if (taskName && taskStatus) {
            if (btnName === "Save") {
                tasks.splice(index, 1, {
                    name: taskName,
                    status: taskStatus
                })
                setTasks(tasks);
            } else {
                setTasks([{
                    name: taskName,
                    status: taskStatus
                }, ...tasks])
            }
            setTaskName("");
            setVisible(false);
            setTaskStatus("");
            setSaveTaskIndex(null);
        } else {
            const emptyField = !taskName ? "Name" : "Task";
            alert(`Field ${emptyField} is empty`)
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setTaskName("");
        setVisible(false);
        setTaskStatus("");
        setSaveTaskIndex(null);
    }

    return (
        <form className={cl.form}>
            <h2>Add new Task</h2>
            <div className={cl.form__content}>
                <div className={cl.form__input}>
                    <strong>Enter task name</strong>
                    <input
                        value={taskName}
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </div>
                <div className={cl.form__input}>
                    <strong>Choose status</strong>
                    <select
                        required
                        value={taskStatus}
                        onChange={(e) => setTaskStatus(e.target.value)}
                    >
                        <option value=""></option>
                        <option value="Todo">Todo</option>
                        <option value="In progress">In progress</option>
                        <option value="Comleted">Comleted</option>
                    </select>
                </div>
            </div>
            <div className={cl.form__button}>
                <button onClick={handleSetTask}>{btnName}</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default TasksForm;

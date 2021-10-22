import React, { useEffect, useState } from 'react'
import cl from "./style.module.css"

const TasksForm = ({ setTask, tasks, setIndexEditTask, btnName, taskId }) => {
    const [taskName, setTaskName] = useState("");
    const [taskStatus, setTaskStatus] = useState("");

    useEffect(() => {
        const isTaskEdit = tasks.find(task => task.id === taskId);;
        if (isTaskEdit) {
            setTaskName(isTaskEdit.name);
            setTaskStatus(isTaskEdit.status);
        }
    }, [taskId, tasks]);


    const handleSetTask = (e) => {
        e.preventDefault();

        if (taskName && taskStatus) {
            console.log(btnName);
            if (btnName === "Save") {
                const editTasks = tasks.map(task => {
                    if (task.id === taskId) {
                        return {
                            name: taskName,
                            status: taskStatus,
                            id: task.id,
                            checked: task.checked
                        }
                    }
                    return task;
                });
                setTask(editTasks);
            } else {
                setTask([{
                    name: taskName,
                    status: taskStatus,
                    id: Date.now(),
                    checked: false
                }, ...tasks])
            }
            resetValues(e);
        } else {
            const emptyField = !taskName ? "Name" : "Task";
            alert(`Field ${emptyField} is empty`)
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        resetValues(e);
    }

    const resetValues = () => {
        setTaskName("");
        setTaskStatus("");
        setIndexEditTask(null);
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
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSetTask}>{btnName}</button>
            </div>
        </form>
    )
}

export default TasksForm;

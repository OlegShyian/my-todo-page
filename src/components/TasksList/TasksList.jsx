import React, { useMemo } from 'react'
import { useState } from 'react/cjs/react.development'
import PageNumbers from './PageNumbers';
import "./style.css"


const TasksList = ({ tasks, setBtnName, setIndexEditTask, setTask }) => {
    const [mainCheckState, setMainCheckState] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const pageNumbers = useMemo(() => {
        const totalPages = Math.ceil(tasks.length / 5);
        return new Array(totalPages).fill("").map((el, ind) => ind + 1);
    }, [tasks]);

    const openCurenTask = (id) => {
        setIndexEditTask(id);
        setBtnName("Save");
    }

    const handleChangeMainCheckState = () => {
        setMainCheckState(!mainCheckState);
        console.log(mainCheckState);
        console.log(tasks);
        setTask(tasks.map((task, ind) => ({ ...task, checked: !mainCheckState })));
    }

    const removeCurrentTask = (id) => {
        const question = window.confirm("After press 'Remove' you completely remove your task, are you sure?")
        if (question) {
            const editedTasks = tasks.filter(task => task.id !== id);
            setTask(editedTasks);
            const allCheckStatus = editedTasks.some(task => task.checked === false);
            setMainCheckState(!allCheckStatus);
            if (editedTasks.length % 5 === 0 && pageNumber !== 1) {
                setPageNumber(pageNumber - 1);
            }
        }
    }

    const handleChangeTaskChecked = (id) => {
        const editedTasks = tasks.map(task => task.id === id
            ? { ...task, checked: !task.checked }
            : task);
        const allCheckStatus = editedTasks.some(task => task.checked === false);

        setTask(editedTasks);
        setMainCheckState(!allCheckStatus);
    }



    return (
        <>
            <ul>
                <li className="list__titles">
                    <div>
                        <input
                            type="checkbox"
                            checked={mainCheckState}
                            onChange={handleChangeMainCheckState}
                        />
                    </div>
                    <div>#</div>
                    <div className="second__element">Task Name</div>
                    <div>Status</div>
                    <div>Edit</div>
                    <div>Remove</div>
                </li>
                <hr style={{ margin: "5px 10px", background: "black" }} />
                {tasks.map((task, ind) =>
                    (ind >= (pageNumber - 1) * 5 && ind < pageNumber * 5)
                        ?
                        <li key={ind} className="list__titles">
                            <div>
                                <input
                                    type="checkbox"
                                    checked={task.checked}
                                    onChange={() => handleChangeTaskChecked(task.id)}

                                />
                            </div>
                            <div>{ind + 1}</div>
                            <div className="second__element">{task.name}</div>
                            <div>{task.status}</div>
                            <div>
                                <button
                                    onClick={() => openCurenTask(task.id)}
                                >Edit</button>
                            </div>
                            <div><button
                                onClick={() => removeCurrentTask(task.id)}
                            >Remove</button></div>
                        </li>
                        :
                        null)}
            </ul>
            <PageNumbers
                pageNumbers={pageNumbers}
                setPageNumber={setPageNumber}
            />
        </>
    )
}

export default TasksList

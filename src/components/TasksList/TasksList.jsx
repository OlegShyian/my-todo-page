import React, { useMemo, useState } from 'react'
import "./style.css"


const TasksList = ({ tasks, setBtnName, setIndexEditTask, setTask }) => {
    const [mainCheckState, setMainCheckState] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const tasksLimit = 3;
    const pageNumbers = useMemo(() => {
        
        const arr = tasks.filter((task, ind) => (ind >= (pageNumber - 1) * tasksLimit && ind < pageNumber * tasksLimit));;
        const mainStatus = arr.every(task => task.checked === true);
        setMainCheckState(mainStatus);

        const totalPages = Math.ceil(tasks.length / tasksLimit);
        return new Array(totalPages).fill("").map((el, ind) => ind + 1);
    }, [tasks, pageNumber]);


    // const [currentTasksList , setCurrentTasksList] = useState(() => {
    //     return tasks.map((task, ind) => (ind >= (pageNumber - 1) * tasksLimit && ind < pageNumber * tasksLimit))
    // })


    const openCurenTask = (id) => {
        setIndexEditTask(id);
        setBtnName("Save");
    }

    const handleChangeMainCheckStatus = () => {
        setMainCheckState(!mainCheckState);
        setTask(tasks.map((task, ind) =>
            (ind >= (pageNumber - 1) * tasksLimit && ind < pageNumber * tasksLimit)
                ? ({ ...task, checked: !mainCheckState })
                : task));
    }

    const removeCurrentTask = (id) => {
        const question = window.confirm("After press 'Remove' you completely remove your task, are you sure?")
        if (question) {
            const editedTasks = tasks.filter(task => task.id !== id);
            setTask(editedTasks);
            const allCheckStatus = editedTasks.some(task => task.checked === false);
            setMainCheckState(!allCheckStatus);
            if (editedTasks.length % tasksLimit === 0 && pageNumber !== 1) {
                setPageNumber(pageNumber - 1);
            }
        }
    }

    const handleChangeTaskChecked = (id) => {
        const editedTasks = tasks.map(task => task.id === id
            ? { ...task, checked: !task.checked }
            : task);
        const tasksOnPage = editedTasks.filter((task, ind) => (ind >= (pageNumber - 1) * tasksLimit && ind < pageNumber * tasksLimit));;
        const mainStatus = tasksOnPage.every(task => task.checked === true);
        setMainCheckState(mainStatus);
        setTask(editedTasks);
    }

    const handleChangePage = (number) => {
        setPageNumber(number);
        const arr = tasks.filter((task, ind) => (ind >= (number - 1) * tasksLimit && ind < number * tasksLimit));;
        const mainStatus = arr.every(task => task.checked === true);
        setMainCheckState(mainStatus);
    }



    return (
        <>
            <ul>
                <li className="list__titles">
                    <div>
                        <input
                            type="checkbox"
                            checked={mainCheckState}
                            onChange={handleChangeMainCheckStatus}
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
                    (ind >= (pageNumber - 1) * tasksLimit && ind < pageNumber * tasksLimit)
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
            <div className="page__conteiner">
                {pageNumbers.map(pageNumber =>
                    <span
                        key={pageNumber}
                        className="page"
                        onClick={() => handleChangePage(pageNumber)}
                    >
                        {pageNumber}
                    </span>
                )}
            </div>
        </>
    )
}

export default TasksList

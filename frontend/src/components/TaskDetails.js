import img_4 from "../images/icon-check.svg"
import img_5 from "../images/icon-cross.svg"
import { useTasksContext } from "../hooks/useTasksContext"
import { Base_Url } from "../Base_Url"
import { useState } from "react"

const TaskDetails = ({ task }) => {
    const { tasks, dispatch, setTasck } = useTasksContext()
    const [updating, setUpdating] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const deleteClick = async (e) => {
        e.preventDefault()
        setDeleting(true)
        const response = await fetch(Base_Url + "/api/task/" + task._id, {
            method: "DELETE"
        })
        const json = await response.json()

        if (response.ok) {
            setDeleting(false)
            dispatch({ type: "DELETE_TASK", payload: json })
        }
    }

    const updateClick = async (e) => {
        e.preventDefault()
        const done = !task.done
        setUpdating(true)
        const response = await fetch(Base_Url + "/api/task/" + task._id, {
            method: "PATCH",
            body: JSON.stringify({ done }),
            headers: {
                "Content-type": "application/json"
            }
        })
        const json = await response.json()
        if (response.ok) {
            // 
            const index = tasks.findIndex(w => w._id === json._id);
            const mm = Object.defineProperty(tasks[index], "done", {
                value: !json.done,
            });
            tasks[index] = mm;
            // 
            setUpdating(false)
            dispatch({ type: "UPDATE_TASK", payload: tasks })
        }
    }
    return (
        <div className={task.done && "box completed " || "box "} >
            <div>
                <form onSubmit={updateClick} >
                    <button type="submit"><img src={img_4} alt="" /></button>
                </form>
                {/* <h5 onClick={() => { setTasck(task.tasck) }}> */}
                <h5 >
                    {updating ? "updating..." : task.tasck}
                </h5>
            </div>
            <form >
                <button className="delete" type="submit" onClick={deleteClick}>
                    {deleting ? "" : <img src={img_5} alt="" />}
                </button>
            </form>
        </div>
    )
}
export default TaskDetails
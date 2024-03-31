import img_4 from "../images/icon-check.svg"
import img_5 from "../images/icon-cross.svg"

export const TaskDetails = ({ task, setTasks, updateDone, deletehandle }) => {

    return (
        < div className={`${task.done && "box completed " || "box"} `}>
            <div>
                <form onSubmit={(e) => updateDone(e, task._id, task.done, setTasks)} >
                    <button type="submit"><img src={img_4} alt="" /></button>
                </form>
                <h5>
                    {task.tasck}
                </h5>
            </div>
            <form onSubmit={(e) => deletehandle(e, task._id, setTasks)} >
                <button className="delete" type="submit" >
                    <img src={img_5} alt="" />
                </button>
            </form>
        </div >
    )
}

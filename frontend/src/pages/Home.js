import { useEffect, useState } from "react"
import { TaskDetails } from "../components/TaskDetails"
import { TaskForm } from "../components/TaskForm"
import img_1 from "../images/bg-desktop-dark.jpg"
import img_2 from "../images/bg-mobile-dark.jpg"
import img_3 from "../images/icon-sun.svg"
import {
    getAllTodo, handelCreate,
    deletecompleted, updateDone, deletehandle
} from "../utils/HaedelApi"
import { fillterFun } from "../utils/javascript"
import { TaskFooter } from "../components/TaskFooter"

const Home = () => {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState("")
    const [id, setId] = useState("all")
    const [done, setDone] = useState(false)

    fillterFun(id)
    useEffect(() => {
        getAllTodo(setTasks)
    }, [])

    return (
        <>
            <div className="background">
                <img src={img_1} alt="" />
                <img src={img_2} alt="" />
            </div>
            <section>
                <nav>
                    <h2>TODO</h2>
                    <img src={img_3} alt="" />
                </nav>
                <div className="container">
                    <TaskForm
                        title={title}
                        done={done}
                        setTitle={setTitle}
                        setTasks={setTasks}
                        handelCreate={handelCreate}
                    />
                    <div className="boxs">
                        {tasks && tasks.map((task) => (
                            <TaskDetails
                                key={task._id}
                                task={task}
                                setTasks={setTasks}
                                updateDone={updateDone}
                                deletehandle={deletehandle}
                            />
                        ))}
                        <TaskFooter
                            tasks={tasks}
                            fillterFun={fillterFun}
                            deletecompleted={deletecompleted}
                            setTasks={setTasks}
                        />
                    </div>
                </div>
            </section >
        </>

    )
}

export default Home
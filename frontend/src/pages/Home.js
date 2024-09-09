import { useEffect, useState } from "react"
import TaskDetails from "../components/TaskDetails"
import { useTasksContext } from "../hooks/useTasksContext"
import img_1 from "../images/bg-desktop-dark.jpg"
import img_2 from "../images/bg-mobile-dark.jpg"
import img_3 from "../images/icon-sun.svg"
import img_4 from "../images/bg-desktop-light.jpg"
import img_5 from "../images/bg-mobile-light.jpg"
import img_6 from "../images/icon-moon.svg"

import { Base_Url } from "../Base_Url"

const Home = () => {
    const { tasks, dispatch, mode, setMode, loading, setLoading, tasck, setTasck } = useTasksContext()
    const [fillter, setFillter] = useState("all")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = { tasck }
        setLoading("create")
        const response = await fetch(Base_Url + "/api/task", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-type": "application/json"
            }
        })
        const json = await response.json()
        if (response.ok) {
            setTasck("")
            setLoading("")
            dispatch({ type: "CREATE_TASK", payload: json })
        }
    }

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading("create")
            const response = await fetch(Base_Url + "/api/task")
            const json = await response.json()
            if (response.ok) {
                setLoading("")
                dispatch({ type: "SET_TASKS", payload: json })
            }
        }
        fetchTasks()
    }, [])

    return (
        <div className={mode === "dark" ? "body dark" : "body light"}>
            <div className="background">
                <img src={mode === "dark" ? img_1 : img_4} alt="" />
                <img src={mode === "dark" ? img_2 : img_5} alt="" />
            </div>
            <section>
                <nav>
                    <h2>TODO</h2>
                    <img src={mode === "dark" ? img_3 : img_6} alt="" onClick={() => { mode === "dark" ? setMode("") : setMode("dark") }} />
                </nav>
                <div className="container">
                    <form className="head" onSubmit={handleSubmit}>
                        <button type="submit"></button>
                        <input
                            type="text"
                            onChange={(e) => setTasck(e.target.value)}
                            value={tasck}
                            placeholder="inter your todo"
                            required />
                    </form>
                    <div className="boxs">
                        {loading === "create" && (
                            <div className={"box loading"} >
                                <div>
                                    <form >
                                        <button type="submit"></button>
                                    </form>
                                    <h5>
                                        loading...
                                    </h5>
                                </div>
                            </div>
                        )}
                        {tasks && tasks.map((task) => {
                            {
                                if (fillter === "all") {
                                    return <TaskDetails key={task._id} task={task} />
                                } else if (fillter === "active" && task.done === false) {
                                    return <TaskDetails key={task._id} task={task} />
                                } else if (fillter === "completed" && task.done === true) {
                                    return <TaskDetails key={task._id} task={task} />
                                }
                            }

                        })}
                        <div className="fotter">
                            <div className="item">
                                {tasks && (
                                    <span>
                                        {tasks.length}
                                    </span>
                                )}
                                <h5>items left</h5>
                            </div>
                            <div className="fillter">
                                <button className={fillter === "all" ? "active" : ""} id="all" onClick={() => { setFillter("all") }}>All</button>
                                <button className={fillter === "active" ? "active" : ""} onClick={() => { setFillter("active") }} >Active</button>
                                <button className={fillter === "completed" ? "active" : ""} onClick={() => { setFillter("completed") }}>completed</button>
                            </div>
                            <div className="cleaer">
                                <form >
                                    <button>cleaer completed</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Home
// 12
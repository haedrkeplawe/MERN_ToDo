import { useState } from "react"
import { useTasksContext } from "../hooks/useTasksContext"
import { Base_Url } from "../Base_Url"

const WorkoutForm = () => {

    const { dispatch, tasck, setTasck } = useTasksContext()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = { tasck }
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
            dispatch({ type: "CREATE_TASK", payload: json })
        }
    }


    return (
        <form className="head" onSubmit={handleSubmit}>
            <button type="submit"></button>
            <input
                type="text"
                value={tasck}
                onChange={(e) => setTasck(e.target.value)}
                placeholder="inter your todo"
                required />
        </form>
    )
}
export default WorkoutForm
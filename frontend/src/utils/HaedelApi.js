import axios from "axios";

const baseUrl = "https://mern-elecric-api-3sm4.onrender.com/api/task"

const getAllTodo = (setTasks) => {
    axios.get(baseUrl)
        .then(async (response) => {
            setTasks(response.data);
        })
}

const handelCreate = (e, title, done, setTitle, setTasks) => {
    e.preventDefault()
    const data = {
        title,
        done
    }
    axios
        .post(baseUrl, data)
        .then(() => {
            setTitle("")
            getAllTodo(setTasks)
        })
}

const deletehandle = (e, id, setTasks) => {
    e.preventDefault()
    axios
        .delete(`${baseUrl}/${id}`)
        .then(() => {
            getAllTodo(setTasks)
        })
}

const updateDone = (e, id, done, setTasks) => {
    e.preventDefault()
    axios
        .patch(`${baseUrl}/${id}`, {
            done: !done
        })
        .then(() => {
            getAllTodo(setTasks)
        })
}

const deletecompleted = (e, setTasks) => {
    e.preventDefault()
    axios
        .delete(`${baseUrl}/`)
        .then(() => {
            getAllTodo(setTasks)
        })
}


export {
    getAllTodo,
    handelCreate,
    deletehandle,
    updateDone,
    deletecompleted
}
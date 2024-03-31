
export const TaskForm = ({ title, done, setTitle, setTasks, handelCreate }) => {
    return (
        <form className="head"  >
            <button type="submit" onClick={(e) => handelCreate(e, title, done, setTitle, setTasks)}></button>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="inter your todo"
                required />
        </form >
    )
}
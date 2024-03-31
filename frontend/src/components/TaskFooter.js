export const TaskFooter = ({ tasks, fillterFun, deletecompleted, setTasks }) => {
    return (
        <div className="fotter">
            <div className="item">
                <span>
                    {tasks && tasks.length}
                </span>
                <h5>items left</h5>
            </div>
            <div className="fillter">
                <button className="active" id="all" onClick={() => fillterFun("all")
                }>All</button>
                <button id="active" onClick={() => fillterFun("active")
                }>Active</button>
                <button id="completed" onClick={() => fillterFun("completed")
                }>completed</button>
            </div>
            <div className="cleaer">
                <form onSubmit={(e) => deletecompleted(e, setTasks)} >
                    <button>cleaer completed</button>
                </form>
            </div>
        </div>
    )
}

require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Task = require("./models/taskSchema")
const PORT = process.env.PORT || 4000
const cors = require("cors")

app.use(express.json())
app.use(cors())


app.get("/api/task", async (req, res) => {
    const tasks = await Task.find({}).sort({ createdAt: -1 })
    res.status(200).json(tasks)
})

app.get("/api/task/:id", async (req, res) => {
    const { id } = req.params
    const tasks = await Task.findById(id)
    if (!tasks) {
        return res.status(404).json({ error: "no such Tasks" })
    }
    res.status(200).json(tasks)
})

app.post("/api/task", async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.delete("/api/task/:id", async (req, res) => {
    const { id } = req.params
    const task = await Task.findOneAndDelete({ _id: id })
    if (!task) {
        return res.status(404).json({ error: "no such Task" })
    }
    res.status(200).json(task)
})

app.patch("/api/task/:id", async (req, res) => {
    const { id } = req.params
    const task = await Task.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!task) {
        return res.status(404).json({ error: "no such Task" })
    }
    res.status(200).json(task)
})






mongoose
    .connect(
        "mongodb+srv://alihassanhaedr:c4a@cluster0.ue5ezcc.mongodb.net/2024todo_list?retryWrites=true&w=majority"
    )
    .then(() => {
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}/`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

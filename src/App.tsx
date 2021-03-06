import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

// CRUD -> GUI || CLI
// create
// read
// update
// delete

// reduser => useReduser => Redux

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed"
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

function App() {
    //BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Ice-cream", isDone: true},
            {id: v1(), title: "Chocolate", isDone: true},
            {id: v1(), title: "Cake", isDone: false},
        ]
    })


    const removeTask = (todoListID: string, tasksID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].filter(t => t.id !== tasksID)
        })
    }
    const addTask = (todoListID: string, title: string) => {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }
    const changeTaskStatus = (todoListID: string, tasksID: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === tasksID
                ? {...t, isDone: isDone}
                : t)
        })
    }
    const changeTaskTitle = (todoListID: string, tasksID: string, title: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === tasksID
                ? {...t, title: title}
                : t)
        })
    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        const newTodoList: TodolistType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }
    const changeTodoListFilter = (todoListID: string, newFilterValue: FilterValuesType) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID
            ? {...tl, filter: newFilterValue}
            : tl))
    }
    const changeTodoListTitle = (todoListID: string, title: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID
            ? {...tl, title: title}
            : tl))
    }

    const getTasksForRender = (todoList: TodolistType) => {
        let tasksForRender = tasks[todoList.id]
        if (todoList.filter === "active") {
            tasksForRender = tasks[todoList.id].filter(t => !t.isDone)
        }
        if (todoList.filter === "completed") {
            tasksForRender = tasks[todoList.id].filter(t => t.isDone)
        }
        return tasksForRender
    }

    //GUI:
    const todoListsComponents = todoLists.length
        ? todoLists.map(tl => {
            return (
                <Grid
                    item
                    key={tl.id}>
                    <Paper
                        elevation={8}
                        style={{padding: "20px"}}
                        square>
                        <TodoList
                            todoListID={tl.id}
                            tasks={getTasksForRender(tl)}
                            filter={tl.filter}
                            title={tl.title}

                            addTask={addTask}
                            removeTask={removeTask}
                            removeTodoList={removeTodoList}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListFilter={changeTodoListFilter}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    </Paper>
                </Grid>
            )
        })
        : <span>Create your first TodoList!</span>

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{margin: "15px 0"}}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid  container spacing={4}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

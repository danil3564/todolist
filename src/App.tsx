import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

// CRUD -> GUI || CLI
// create
// read
// update
// delete

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

function App() {
    //BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
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
    //

    const removeTask = (tasksID: string, todoListID: string) => {
        // const currentTodoListTasks:  Array<TaskType> = tasks[todoListID]
        // const updatedTasks:  Array<TaskType> =
        //     currentTodoListTasks.filter(t => t.id !==tasksID)
        // tasks[todoListID] = updatedTasks
        // setTasks({...tasks})
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].filter(t => t.id !== tasksID)
        })
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        // const currentTodoListTasks:  Array<TaskType> = tasks[todoListID]
        // const updatedTasks:  Array<TaskType> = [newTask, ...currentTodoListTasks]
        // setTasks({...tasks, [todoListID]: updatedTasks})
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }
    const changeTaskStatus = (tasksID: string, isDone: boolean, todoListID: string) => {
        // const currentTodoListTasks: Array<TaskType> = tasks[todoListID]
        // const updatedTasks:  Array<TaskType> = currentTodoListTasks.map(t => t.id === tasksID ? {...t, isDone} : t)
        // tasks[todoListID] = updatedTasks
        // setTasks({...tasks})
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === tasksID ? {
                ...t,
                isDone: isDone
            } : t)
        })
    }
    const changeTaskTitle = (tasksID: string, title: string, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === tasksID ? {
                ...t,
                title: title
            } : t)
        })
    }


    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }
    const changeTodoListFilter = (newFilterValue: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {
            ...tl,
            filter: newFilterValue
        } : tl))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {
            ...tl,
            title: title
        } : tl))
    }


    const getTasksForRender = (todoList: TodoListType) => {
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

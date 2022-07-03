import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from "./reducers/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";

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

function AppWithReducers() {
    //BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchTodoListsReducer] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, dispatchTasksReducer] = useReducer(tasksReducer, {
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
        dispatchTasksReducer(removeTaskAC(todoListID, tasksID))
    }
    const addTask = (todoListID: string, title: string) => {
        dispatchTasksReducer(addTaskAC(todoListID, title))
    }
    const changeTaskStatus = (todoListID: string, tasksID: string, isDone: boolean) => {
        dispatchTasksReducer(changeTaskStatusAC(todoListID, tasksID, isDone))
    }
    const changeTaskTitle = (todoListID: string, tasksID: string, title: string) => {
        dispatchTasksReducer(changeTaskTitleAC(todoListID, tasksID, title))
    }

    const removeTodoList = (todoListID: string) => {
        const action = removeTodoListAC(todoListID)
        dispatchTodoListsReducer(action)
        dispatchTasksReducer(action)
    }
    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTasksReducer(action)
        dispatchTodoListsReducer(action)
    }
    const changeTodoListFilter = (todoListID: string, newFilterValue: FilterValuesType) => {
        dispatchTodoListsReducer(changeTodoListFilterAC(todoListID, newFilterValue))
    }
    const changeTodoListTitle = (todoListID: string, title: string) => {
        dispatchTodoListsReducer(changeTodoListTitleAC(todoListID, title))
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

export default AppWithReducers;

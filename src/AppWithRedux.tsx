import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./reducers/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, store} from "./reducers/store";

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

export function AppWithRedux() {
    //BLL:
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const removeTask = (todoListID: string, tasksID: string) => {
        dispatch(removeTaskAC(todoListID, tasksID))
    }
    const addTask = (todoListID: string, title: string) => {
        dispatch(addTaskAC(todoListID, title))
    }
    const changeTaskStatus = (todoListID: string, tasksID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoListID, tasksID, isDone))
    }
    const changeTaskTitle = (todoListID: string, tasksID: string, title: string) => {
        dispatch(changeTaskTitleAC(todoListID, tasksID, title))
    }

    const removeTodoList = (todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }
    const addTodoList = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    const changeTodoListFilter = (todoListID: string, newFilterValue: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListID, newFilterValue))
    }
    const changeTodoListTitle = (todoListID: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListID, title))
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

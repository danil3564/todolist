import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {AddCircleOutline, HighlightOff} from "@material-ui/icons";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (tasksID: string, isDone: boolean, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (tasksID: string, title: string, todoListID: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const tasksJSXElements = props.tasks.length
        ? props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.todoListID)
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(t.id, title, props.todoListID)
            }
            const taskClasses = t.isDone ? "is-done" : "" ;
            return (
                <ListItem
                    key={t.id}
                    style={{padding: "0px"}}>
                    <Checkbox
                        size={"small"}
                        color={"primary"}
                        onChange={changeStatus}
                        checked={t.isDone}/>
                    <EditableSpan
                        title={t.title}
                        classes={taskClasses}
                        updateTitle={changeTaskTitle}
                    />
                    {/*<span className={taskClasses}>{t.title}</span>*/}
                    <IconButton
                        color={"secondary"}
                        size={"small"}
                        onClick={removeTask}>
                        <HighlightOff/>
                    </IconButton>
                    {/*<button onClick={removeTask}>x</button>*/}
                </ListItem>
            )
        })
        : <span>List is empty</span>

    const changeFilter = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter, props.todoListID)
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }

    // const allBtnClasses = props.filter === "all" ? "active-filter" : ""
    // const activeBtnClasses = props.filter === "active" ? "active-filter" : ""
    // const completedBtnClasses = props.filter === "completed" ? "active-filter" : ""

    const removeTodoList = () => props.removeTodoList(props.todoListID)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} updateTitle={changeTodoListTitle}/>
                <IconButton
                    color={"secondary"}
                    size={"small"}
                    onClick={removeTodoList}>
                    <HighlightOff/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <List>
                {tasksJSXElements}
            </List>
            <div>
                <Button
                    size={"small"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    variant={"contained"}
                    disableElevation
                    onClick={changeFilter("all")}>All</Button>
                <Button
                    size={"small"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    variant={"contained"}
                    disableElevation
                    onClick={changeFilter("active")}>Active</Button>
                <Button
                    size={"small"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    variant={"contained"}
                    disableElevation
                    onClick={changeFilter("completed")}>Completed</Button>
            </div>
        </div>
    );
};

export default TodoList;
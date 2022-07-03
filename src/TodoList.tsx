import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {DeleteOutline, HighlightOff} from "@material-ui/icons";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    addTask: (todoListID: string, title: string) => void
    removeTask: (todoListID: string, taskID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (todoListID: string, filter: FilterValuesType) => void
    changeTaskStatus: (todoListID: string, tasksID: string, isDone: boolean) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
    changeTaskTitle: (todoListID: string, tasksID: string, title: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    // console.log(state.todolists)
    const tasksJSXElements = props.tasks.length
        ? props.tasks.map(t => {
            const removeTask = () => props.removeTask(props.todoListID, t.id)
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked)
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(props.todoListID, t.id, title)
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
        return () => props.changeTodoListFilter(props.todoListID, filter)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.todoListID, title)
    }
    const addTask = (title: string) => {
        props.addTask(props.todoListID, title)
    }
    const removeTodoList = () => props.removeTodoList(props.todoListID)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} updateTitle={changeTodoListTitle}/>
                <IconButton
                    color={"secondary"}
                    size={"small"}
                    onClick={removeTodoList}>
                    <DeleteOutline/>
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
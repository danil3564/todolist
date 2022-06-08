import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddCircleOutline} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const itemTitle = title.trim()
        if(itemTitle){
            props.addItem(itemTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>)=> {
        const itemTitle = e.currentTarget.value.trim()
        setTitle(e.currentTarget.value)
        if(error && itemTitle)setError(false)
        if(!error && !itemTitle)setError(true)
    }

    const onKeyDownAddTask  = (e: KeyboardEvent<HTMLInputElement>)=> e.key === "Enter" && addTask()
    const errorInputStyle = error ? {border: "2px solid red", outline: "none"} : undefined

    return (
        <div>
            <TextField
                // style={errorInputStyle}
                size={"small"}
                variant={"outlined"}
                color={"primary"}
                value={title}
                label={"Title"}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTask}
                error={error}
                helperText={error && "Title is required!"}
            />
            <IconButton
                color={"primary"}
                size={"small"}
                onClick={addTask}>
                <AddCircleOutline/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;
import React, { useState } from 'react';

import './Todo.css';

import {
    List,
    ListItem,
    ListItemText,
    Modal,
    Button
} from '@material-ui/core';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import db from './firebase';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

function Todo(props) {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const updateTodo = () => {
        db.collection('todos')
            .doc(props.text.id).set({
                task: input
            }, { merge: true });
        setOpen(false);
    }

    return (
        <>
            <Modal
                open={ open }
                onClose={ e => setOpen(false) }
            >
                <div className={ classes.paper }>
                    <h1>Modal</h1>
                    <input 
                        type="text"
                        value={ input }
                        onChange={ e => setInput(e.target.value) }
                        placeholder={ props.text.task }
                    />
                    <Button 
                        onClick={ updateTodo }
                        variant="contained"
                        color="primary"
                        >Update Todo
                    </Button>
                </div>
            </Modal>
            <List className="todo__list">
                <ListItem>
                    <DeleteForeverIcon 
                        onClick={ e => db.collection('todos').doc(props.text.id).delete() }
                        variant="contained"
                        color="secondary"
                        className="m-4"
                        />
                    <Button 
                        onClick={ e => setOpen(true) }
                        className="m-4"
                        variant="contained"
                        color="primary"
                    >Edit
                    </Button>
                    <ListItemText 
                        key={ props.text.id }
                        primary={ props.text.task }
                        secondary="Dummy deadline"/>
                </ListItem>
            </List>
        </>
    );
}

export default Todo;
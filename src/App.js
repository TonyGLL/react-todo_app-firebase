import React, { useEffect, useState } from 'react';
import './App.css';

import { Button, Input, InputLabel, FormControl } from '@material-ui/core';
import Todo from './Todo';

import db from './firebase';
import firebase from 'firebase';

function App() {

  const [todos, setTodos] = useState([]);
  
  const [input, setInput] = useState('');

  useEffect(() => {
    db.collection('todos')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setTodos(snapshot.docs.map(doc => (
          {
            id: doc.id,
            task: doc.data().task
          })));
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();

    db.collection('todos').add({
      task: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');
  }

  return (
    <div className="App">
      <h1 className="m-4">TODO List App 🚀!!</h1>
      <form>
        <FormControl>
          <InputLabel>Write a TODO</InputLabel>
          <Input
            type="text"
            value={ input }
            onChange={ e => setInput(e.target.value) }
            />
        </FormControl>
        <Button 
          type="submit"
          onClick={ addTodo }
          variant="contained"
          color="primary"
          disabled={ !input }
          className="m-3"
          >
          Add Todo
        </Button>
      </form>

      <ul>
        {
          todos.map(todo => (
            <Todo text={ todo } />
          ))
        }
      </ul>
    </div>
  );
}

export default App;

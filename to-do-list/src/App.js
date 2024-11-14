import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Todo from './Todo';

function App() {
  const [todo, setTodo] = useState([
    { id: 1, text: 'Learn Web', checked: false },
    { id: 2, text: 'Get a Job', checked: false }
  ]);
  const [todoid, setTodoid] = useState(2);

  const deleteTodo = (id) => {
    let newTodos = [...todo];
    let index = newTodos.findIndex(item => (item.id === id));
    newTodos.splice(index, 1);
    setTodo(newTodos);
  }

  const setChecked = (id, check) => {
    console.log(id, check);
    let newTodos = [...todo];
    let index = newTodos.findIndex(item => (item.id === id));
    newTodos[index] = { id: id, text: newTodos[index].text, check};
    setTodo(newTodos);
  }

  let todos = todo.map((item => <Todo key={item.id} data={item} deleteTodo={deleteTodo} setChecked={setChecked}/>))
  let addTodo = ((value) => {
    let newTodos = [...todo];
    let newId = todoid + 1;
    setTodoid(newId);
    newTodos.push({ id: newId, text: value, checked: false });
    setTodo(newTodos);
    document.getElementById('todo').value = '';
  })
  console.log(todo);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <Form onSubmit={(e) => {
        e.preventDefault();
        addTodo(e.target.todo.value);
      }}>
        <Form.Group className="mb-3 d-flex align-items-center gap-3" controlId="todo">
        <Form.Label>Todo input</Form.Label>
        <Form.Control type="text" name="todo" placeholder="할 일을 입력하세요" />
        </Form.Group>
      </Form>
      <hr/>
      <div>
        {todos}
      </div>
    </div>
  );
}

export default App;


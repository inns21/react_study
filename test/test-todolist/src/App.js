import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import './App.css';
import {useState, useEffect} from 'react';
import Todo from './Todo';

function App() {
  const [todo, setTodo] = useState([
    { id: 1, text: 'Learn Web', checked: false },
    { id: 2, text: 'Get a Job', checked: false }
  ]);
  const [todoid, setTodoid] = useState(2);

  let todos = todo.map((item => <Todo key={item.id} data={item} />))
  let addTodo = ((value) => {
    let newTodos = [...todo];
    let newId = todoid + 1;
    setTodoid(newId);
    newTodos.push({ id: newId, text: value, checked: false });
    setTodo(newTodos);
    document.getElementById('todo').value = '';
  })


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

import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Todo = ({ data, deleteTodo, setChecked }) => {
  const [mode, setMode] = useState('read');
  const [text, setText] = useState(data.text);
  const [isCheked, setIsChecked] = useState(false);

  let className = 'd-flex gap-2';
  let formClass = 'hidden';

  const handleCheckbox = () => {
    setIsChecked(!isCheked);
    setChecked(data.id, !isCheked);
  }
  const todoDelete = () => {
    deleteTodo(data.id);
  }

  if (mode === 'edit') {
    className += ' hidden';
    formClass = '';
  }
  return (
    <div>
      <Form.Check id={`check-api-${data.id}`} className={className}>
        <Form.Check.Input  type="checkbox"  id={`check-api-${data.id}`} onClick={handleCheckbox}/>
        <Form.Check.Label>{data.text}</Form.Check.Label>
        <Button variant="danger" size="sm" onClick={todoDelete}>Delete</Button>
        <Button variant="info" size="sm" onClick={() => { setMode('edit'); }}>Edit</Button>
      </Form.Check>
      <Form className={formClass}>
        <Form.Group className="mb-3 d-flex gap-2" controlId={`edit-todo-${data.id}`}>
          <Form.Control type="text" id={`edit-todo-${data.id}`} value={text} />
          <Button variant="secondary" size="sm" >Update</Button>
          <Button variant="secondary" size="sm" onClick={() => { setMode('read'); }}>Cancle</Button>
        </Form.Group>
      </Form>

    </div>

  )
}
export default Todo;
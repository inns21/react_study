import React, { useState } from "react";
import Form from 'react-bootstrap/Form';


const Todo = ({ data }) => {
  return (
    <div>
      <Form.Check id={data.id}>
        <Form.Check.Input  type="checkbox"  id={data.id} />
        <Form.Check.Label>{data.text}</Form.Check.Label>
      </Form.Check>
    </div>

  )
}
export default Todo;
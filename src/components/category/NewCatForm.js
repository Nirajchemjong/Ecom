import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addCategoryAction } from "../../pages/category/CatAction";
import slugify from "slugify";

export const NewCatForm = () => {
  const [form, setFrom] = useState({
    status: "inactive",
  });
  const dispatch = useDispatch();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const slug = slugify(form.name, { lower: true, trim: true });
    dispatch(addCategoryAction({ ...form, slug }));
  };
  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setFrom({ ...form, [name]: value });
    console.log(form);
  };
  //   console.log(form);
  //   const inputFields = [
  //     {
  //       label: "Category Name",
  //       name: "name",
  //       type: "text",
  //       placeholder: "electronic",
  //       required: true,
  //     },
  //   ];
  return (
    <div>
      <Form
        className='mx-4 border p-5 shadow-lg rounded mt-5'
        onSubmit={handleOnSubmit}
      >
        <h1>Cat Categories</h1>
        <Row>
          <Col md='2'>
            {" "}
            <Form.Group className='mb-3'>
              <Form.Check
                name='status'
                type='switch'
                id='custom-switch'
                label='Switch'
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>
          <Col md='5'>
            <Form.Group className='mb-3'>
              <Form.Control
                name='name'
                type='text'
                label='status'
                onChange={handleOnChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md='5'>
            {" "}
            <Button
              variant='primary'
              type='submit'
              className='d-grid'
            >
              Add New Category
            </Button>
          </Col>
        </Row>

        {/* {inputFields.map((item, i) => (
          <CustomInput
            key={i}
            {...item}
            onChange={handleOnChange}
          />
        ))} */}
      </Form>
    </div>
  );
};

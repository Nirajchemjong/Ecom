import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addCategoryAction, deleteCat } from "../../pages/category/CatAction";
import { setmodalShow } from "../../pages/system-state/SystemSlice";

export const EditCatForm = ({ selectedCat }) => {
  const [form, setFrom] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setFrom(selectedCat);
  }, [selectedCat]);
  // console.log(form.selectedCat);
  // console.log(catList);
  // console.log(form.status);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // const slug = slugify(form.name, { lower: true, trim: true });
    dispatch(addCategoryAction(form));
  };
  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setFrom({ ...form, [name]: value });
    // console.log(form);
  };
  const handleOnDelete = (slug) => {
    alert(`Are you sure you want to delete ${slug}`);
    // console.log(slug);
    dispatch(deleteCat(slug));
    dispatch(setmodalShow(false));
  };

  return (
    <div>
      <Form
        className='mx-4 border p-5 shadow-lg rounded '
        onSubmit={handleOnSubmit}
      >
        <h1>Cat Categories</h1>

        <Row>
          <Col lg='2'>
            <Form.Group className='mb-3'>
              <Form.Check
                name='status'
                type='switch'
                id='custom-switch'
                label='Switch'
                onChange={handleOnChange}
                // value={form.selectedCat.status}
                checked={form.status === "active"}
              />
            </Form.Group>
          </Col>

          <Col lg='5'>
            <Form.Group className='mb-3'>
              <Form.Control
                name='name'
                type='text'
                label='status'
                value={form.name}
                onChange={handleOnChange}
                required
              />
            </Form.Group>
          </Col>
          <Form.Label> Slug (ID): {form.slug}</Form.Label>
          <Col lg='5'>
            <Button
              variant='primary'
              type='submit'
              className='d-grid'
              onClick={() => dispatch(setmodalShow(false))}
            >
              Update Category
            </Button>
          </Col>

          <Button
            variant='danger'
            className='d-grid my-2'
            onClick={() => handleOnDelete(form.slug)}
          >
            Delete
          </Button>
        </Row>
      </Form>
    </div>
  );
};

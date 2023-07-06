import React, { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";
import AdminLayout from "../layout/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAction,
  deleteProduct,
  fetchSingleProduct,
} from "../../pages/products/ProductAction";
import { useNavigate, useParams } from "react-router-dom";

export const EditProduct = () => {
  const [display, setDisplay] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { SelectedProduct } = useSelector(
    (state) => state.SelectedProductState
  );
  const { catList } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
    if (display.slug !== SelectedProduct.slug) {
      setDisplay(SelectedProduct);
    }
  }, [
    dispatch,
    display.slug,
    SelectedProduct.slug,
    setDisplay,
    SelectedProduct,
    id,
  ]);

  //   console.log(display);
  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setDisplay({
      ...display,
      [name]: value,
    });
  };
  const handleOnDelete = (slug) => {
    alert(`Are you sure you want to delete ${slug}`);
    dispatch(deleteProduct(slug));
    navigate("/products");
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(addProductAction(display));
    navigate("/products");
  };

  const inputFields = [
    {
      label: "Product Name",
      name: "title",
      type: "text",
      placeholder: "Title",
      value: display.title,
      required: true,
    },
    {
      label: "sku",
      name: "sku",
      type: "text",
      placeholder: "Sku",
      value: display.sku,
      disable: true,
    },
    {
      label: "Price",
      name: "Price",
      type: "number",
      placeholder: "$12",
      value: display.Price,
      required: true,
    },
    {
      label: "Sale Price",
      name: "salePrice",
      type: "number",
      placeholder: "$12",
      value: display.salePrice,
      required: true,
    },
    {
      label: "Sales Start At",
      name: "saleStartAt",
      type: "date",
      value: display.saleStartAt,
      //   placeholder: "Niraj@gmail.com",
      required: true,
    },
    {
      label: "Sales End At",
      name: "salesEndAt",
      type: "date",
      //   placeholder: "*******",
      //   minLength: 6,
      value: display.salesEndAt,
      required: true,
    },
  ];
  return (
    <div>
      <AdminLayout title='Edit Product'>
        <Form
          className='mx-4 border p-5 shadow-lg rounded mt-1'
          onSubmit={handleOnSubmit}
        >
          <h1>Editing Product</h1>
          <Row>
            <Form.Group className='mb-3'>
              <Form.Check
                name='status'
                type='switch'
                id='custom-switch'
                label='Switch'
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>SLUG: {display.slug}</Form.Label>
            </Form.Group>
            {inputFields.map((item, i) => (
              <CustomInput
                key={i}
                {...item}
                onChange={handleOnChange}
                // value={display.item}
              />
            ))}
            <FloatingLabel
              controlId='floatingSelect'
              label='Select Categories'
              className='mb-3'
              name='selectedCategory'
            >
              <Form.Select
                aria-label='Select Product Categories'
                onChange={handleOnChange}
                name='selectedCategory'
              >
                <option value=' '>---Select---</option>
                {catList.map(({ name, slug }, i) => (
                  <option
                    key={i}
                    value={slug}
                    selected={slug === display.selectedCategory}
                  >
                    {name}
                  </option>
                ))}
                <option value='1'>One</option>
                <option value='2'>Two</option>
                <option value='3'>Three</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel
              controlId='floatingTextarea'
              label='Product description'
              className='mb-3'
              name='description'
              value={display.description}
            >
              <Form.Control
                name='description'
                as='textarea'
                placeholder='Product Description'
                style={{ height: "100px" }}
                onChange={handleOnChange}
                value={display.description}
              />
            </FloatingLabel>

            <Col md='8'>
              <Button
                variant='warning'
                type='submit'
                className='w-100 p-4 text-center mb-3'
              >
                Update
              </Button>
            </Col>
            <Col md='4'>
              <Button
                variant='danger'
                className=' w-100 p-4 text-center mb-3'
                onClick={() => handleOnDelete(display.slug)}
              >
                Delete
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
      </AdminLayout>
    </div>
  );
};

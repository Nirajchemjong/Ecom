import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProduct } from "../../pages/products/ProductSlice";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const [display, setDisplay] = useState([]);

  const { ProductList } = useSelector((state) => state.productState);

  //   console.log({ ...ProductList });

  const dispatch = useDispatch();
  useEffect(() => {
    setDisplay(ProductList);
  }, [ProductList]);
  const handleOnSearch = (e) => {
    const { value } = e.target;
    const filteredProduct = ProductList.filter(({ title, slug }) =>
      title.toLowerCase().includes(value.toLowerCase())
    );
    setDisplay(filteredProduct);
  };
  const handleOnClick = (item) => {
    dispatch(setSelectedProduct(item));
    // navigate("/Edit-Product");
  };
  return (
    <div>
      <Form.Group className='mb-3'>
        <Form.Control
          name='search'
          type='text'
          label='Search'
          placeholder='Search'
          className='w-25 m-3'
          onChange={handleOnSearch}
          // value={form.name}
          // onChange={handleOnChange}
          // required
        />
      </Form.Group>
      <br />
      Product Listed
      <Table
        striped
        bordered
        hover
        className='m-2'
      >
        <thead>
          <tr>
            <th>#</th>
            <th>status</th>
            <th>Product Name</th>
            <th>Product Img</th>
            <th>Slug</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Sale Price</th>
            <th>Sales Start Date</th>
            <th>Sales End Date</th>
            <th>Selected Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {display.map((item, i) => (
            <tr key={item.slug}>
              <td>{i + 1}</td>
              <td>
                <span className={item.status}>{item.status}</span>
              </td>
              <td>{item.title}</td>
              <td>
                <img
                  src={item.thumbnail}
                  alt='images'
                  width={150}
                />
              </td>
              <td>{item.slug}</td>
              <td>{item.sku}</td>
              <td>{item.Price}</td>
              <td>{item.salePrice}</td>
              <td>{item.saleStartAt}</td>
              <td>{item.salesEndAt}</td>
              <td>{item.selectedCategory}</td>
              <td>{item.description}</td>
              <td>
                <Link to={`/Edit-Product/${item.slug}`}>
                  <Button
                    variant='warning'
                    onClick={() => handleOnClick(item)}
                  >
                    Edit
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;

import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
// import { setCatList } from "../../pages/category/CatSlice";
import { EditCatForm } from "./EditCatForm";
import { CustomModal } from "../layout/customModal/CustomModal";
import { setmodalShow } from "../../pages/system-state/SystemSlice";

export const CatTable = () => {
  const { catList } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [selectedCat, setselectedCat] = useState({});
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    setDisplay(catList);
  }, [catList]);

  const handleOnClick = (item) => {
    setselectedCat(item);
    dispatch(setmodalShow(true));

    // console.log(selectedCat);
  };
  const handleOnSearch = (e) => {
    const { value } = e.target;
    // console.log(value);

    const filteredValue = catList.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    setDisplay(filteredValue);
  };
  return (
    <div>
      <CustomModal title='Update Category'>
        <EditCatForm selectedCat={selectedCat} />
      </CustomModal>
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
      Categories Table
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
            <th>Name</th>
            <th>Slug</th>
          </tr>
        </thead>
        <tbody>
          {display.map((item, i) => (
            <tr key={item.slug}>
              <td>{i + 1}</td>
              <td>
                <span className={item.status}>{item.status}</span>
              </td>
              <td>{item.name}</td>
              <td>{item.slug}</td>
              <td>
                <Button
                  variant='warning'
                  onClick={() => handleOnClick(item)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

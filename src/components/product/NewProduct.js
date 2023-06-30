import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductTable from "./ProductTable";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "../../pages/products/ProductAction";

export const NewProduct = () => {
  //   const handleOnChange = (e) => {
  //     const { value, name } = e.target;

  //     console.log(value, name);
  //   };
  //   const handleOnSubmit = (e) => {
  //     e.preventDefault();
  //   };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  const handleOnClick = () => {
    navigate("/Add-Product");
    // alert("btn clicked");
  };
  return (
    <div className='w-100 flex'>
      <Button
        className='p-2 justify-content-end'
        onClick={() => handleOnClick()}
      >
        Add New Product
      </Button>

      <ProductTable></ProductTable>
    </div>
  );
};

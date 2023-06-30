import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { NewProduct } from "../../components/product/NewProduct";

const Products = () => {
  return (
    <AdminLayout pageTitle='Products'>
      <NewProduct />
      {/* <AddProduct /> */}
    </AdminLayout>
  );
};

export default Products;

import React, { useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { NewCatForm } from "../../components/category/NewCatForm";
import { useDispatch } from "react-redux";
import { fetchAllCategories } from "./CatAction";
import { CatTable } from "../../components/category/CatTable";

const Category = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  return (
    <AdminLayout pageTitle='Category'>
      <NewCatForm />
      <CatTable />
    </AdminLayout>
  );
};

export default Category;

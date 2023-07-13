import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { TBL_PRODUCT } from "../../utils/Constant";
import { db } from "../../config/firebase-config";
import { setProductList, setSelectedProduct } from "./ProductSlice";

export const addProductAction =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      const res = setDoc(doc(db, TBL_PRODUCT, slug), rest, { merge: true });

      toast.promise(res, {
        pending: "please wait... ",
        success: "Product Added Succesfully",
        error: "Unable to add, Please try again later",
      });
      dispatch(fetchAllProducts());
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

export const fetchAllProducts = () => async (dispatch) => {
  try {
    const q = query(collection(db, TBL_PRODUCT));
    const productSnap = await getDocs(q);
    const productList = [];

    productSnap.forEach((item) => {
      const slug = item.id;
      const data = item.data();
      productList.push({ ...data, slug });
    });
    dispatch(setProductList(productList));
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};

export const fetchSingleProduct = (id) => async (dispatch) => {
  try {
    // console.log(id);
    //   const q = query(collection(db, TBL_PRODUCT));
    const productSnap = await getDoc(doc(db, TBL_PRODUCT, id));
    const data = productSnap.data();
    dispatch(setSelectedProduct({ ...data, slug: id }));
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};

export const deleteProduct = (slug) => (dispatch) => {
  try {
    const res = deleteDoc(doc(db, TBL_PRODUCT, slug));
    toast.promise(res, {
      pending: "Please wait ...",
      success: "Product has been Deleted",
      error: "Unable to delete, Please try again",
    });
    dispatch(fetchAllProducts());
    return true;
  } catch (error) {
    toast.error(error.message);
    console.log(error.message);
  }
};

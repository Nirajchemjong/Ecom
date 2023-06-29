import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase-config";
import { TBL_CATEGOR } from "../../utils/Constant";
import { setCatList } from "./CatSlice";

export const addCategoryAction =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      const pending = setDoc(doc(db, TBL_CATEGOR, slug), rest, {
        merge: true,
      });

      toast.promise(pending, {
        pending: "please Wait your data is being updating..",
        success: "Category database has been updated",
        error: "Unable to process your request, please try again later",
      });
      dispatch(fetchAllCategories());
    } catch (error) {
      toast.error(error.message);
    }
  };

export const fetchAllCategories = () => async (dispatch) => {
  try {
    //read all data from TBL_CATEGORY
    const q = query(collection(db, TBL_CATEGOR));
    const catSnap = await getDocs(q);
    // console.log(catSnap);
    const catList = [];
    catSnap.forEach((item) => {
      const slug = item.id;
      const data = item.data();
      catList.push({ ...data, slug });
    });
    dispatch(setCatList(catList));
    console.log(catList);
  } catch (error) {
    toast.error(error.message);
  }
};

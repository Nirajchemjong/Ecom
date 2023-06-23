import { toast } from "react-toastify";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setUsers } from "./UserSlice";

export const createNewAdminAuth = async (obj) => {
  try {
    const respPending = createUserWithEmailAndPassword(
      auth,
      obj.email,
      obj.password
    );
    toast.promise(respPending, {
      pending: "Please wait ..",
    });

    const { user } = await respPending;
    if (user?.uid) {
      console.log(user?.uid);
      createAdminUser({ ...obj, id: user?.uid });
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const createAdminUser = async ({ id, ...userInfo }) => {
  try {
    console.log(id, userInfo);
    await setDoc(doc(db, "users", id), userInfo);
    toast.success("New admin user has been created!");
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};

// =============below here is for userSlice =============

export const getUserAction = (uid) => async (dispatch) => {
  console.log(uid);
  try {
    const userSnap = await getDoc(doc(db, "users", uid));
    if (userSnap.exists()) {
      const user = userSnap.data();
      dispatch(setUsers({ ...user, uid }));
    }
  } catch (error) {
    toast.error(error.message);
  }
};

import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, ProgressBar, Row } from "react-bootstrap";
import AdminLayout from "../layout/AdminLayout";
import { CustomInput } from "../custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { addProductAction } from "../../pages/products/ProductAction";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import { fetchAllCategories } from "../../pages/category/CatAction";
import { toast } from "react-toastify";
import { storage } from "../../config/firebase-config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const AddProduct = () => {
  const [product, setProduct] = useState({
    status: "inactive",
  });
  const [cat, setCategory] = useState([]);
  const [progress, setProgress] = useState(0);
  const { catList } = useSelector((state) => state.categories);
  const [img, setImg] = useState();

  //   console.log(cat);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    !cat.length && dispatch(fetchAllCategories()) && setCategory(catList);
  }, [catList, dispatch, cat]);
  //   console.log(cat);

  const handleOnImgAttached = (e) => {
    const { files } = e.target;
    setImg([...files]);
  };
  const handleOnChange = (e) => {
    let { checked, value, name } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // console.log({ slug, ...product });

    try {
      const slug = slugify(product.title, { lower: true, trim: true });
      if (img.length) {
        const imgResp = img.map((img) => {
          return new Promise((resolve, reject) => {
            const storeRef = ref(
              storage,
              `products/img/${Date.now()}-${img.name}`
            );

            const uploadImg = uploadBytesResumable(storeRef, img);

            uploadImg.on(
              //state changed
              "state_changed",
              //progress while changed

              (snapshot) => {
                const per = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(per); //this is for progress bar
              },

              (error) => {
                //to check the error
                toast.error(error.message);
              },
              // once uploading process is completed, get the url of the upload image
              async () => {
                await getDownloadURL(uploadImg.snapshot.ref).then((url) => {
                  resolve(url);
                });
              }
            );
          });
        });
        const imgUrls = await Promise.all(imgResp);
        dispatch(
          addProductAction({
            ...product,
            slug,
            images: imgUrls,
            thumbnail: imgUrls[0],
          })
        );
      }

      navigate("/products");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const inputFields = [
    {
      label: "Product Name",
      name: "title",
      type: "text",
      placeholder: "Title",
      required: true,
    },
    {
      label: "sku",
      name: "sku",
      type: "text",
      placeholder: "Sku",
      required: true,
    },
    {
      label: "Price",
      name: "Price",
      type: "number",
      placeholder: "$12",
      required: true,
    },
    {
      label: "Sale Price",
      name: "salePrice",
      type: "number",
      placeholder: "$12",
      required: true,
    },
    {
      label: "Sales Start At",
      name: "saleStartAt",
      type: "date",
      //   placeholder: "Niraj@gmail.com",
      required: true,
    },
    {
      label: "Sales End At",
      name: "salesEndAt",
      type: "date",
      //   placeholder: "*******",
      //   minLength: 6,
      required: true,
    },
  ];

  return (
    <div>
      <AdminLayout title='products'>
        <Form
          className='mx-4 border p-5 shadow-lg rounded mt-1'
          onSubmit={handleOnSubmit}
        >
          <h1>Add New Product</h1>
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
            {inputFields.map((item, i) => (
              <CustomInput
                key={i}
                {...item}
                onChange={handleOnChange}
              />
            ))}
            <FloatingLabel
              controlId='floatingSelect'
              label='Select Categores'
              className='mb-3'
              name='selectedCategory'
            >
              <Form.Select
                aria-label='Select Product Categories'
                onChange={handleOnChange}
                name='selectedCategory'
              >
                {/* <option>Select Product Categories</option>
                <option value='1'>One</option>
                <option value='2'>Two</option>
                <option value='3'>Three</option> */}
                {cat.map(({ name, slug }) => (
                  <option
                    key={slug}
                    value={name}
                  >
                    {name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel
              controlId='floatingTextarea'
              label='Product description'
              className='mb-3'
              name='description'
            >
              <Form.Control
                name='description'
                as='textarea'
                placeholder='Product Description'
                style={{ height: "100px" }}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <Form.Group className='mb-3'>
              <Form.Control
                name='images'
                type='file'
                onChange={handleOnImgAttached}
                multiple
              ></Form.Control>
            </Form.Group>
            <ProgressBar
              animated
              now={progress}
              className='mb-3'
            />
            <Button
              variant='primary'
              type='submit'
              className='text-center'
            >
              Add New Product
            </Button>
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

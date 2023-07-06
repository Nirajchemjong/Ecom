import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, ProgressBar, Row } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAction,
  fetchSingleProduct,
} from "../../pages/products/ProductAction";
import slugify from "slugify";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllCategories } from "../../pages/category/CatAction";
import { toast } from "react-toastify";
import { storage } from "../../config/firebase-config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const EditProductForm = () => {
  const [product, setProduct] = useState({});
  const [progress, setProgress] = useState(0);
  const { catList } = useSelector((state) => state.categories);

  const { SelectedProduct } = useSelector(
    (state) => state.SelectedProductState
  );

  const [img, setImg] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    !product.slug && dispatch(fetchSingleProduct(id));
    dispatch(fetchAllCategories());
    setProduct(SelectedProduct);
  }, [dispatch, id, SelectedProduct, product]);
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
      value: product.title,
      required: true,
    },
    {
      label: "sku",
      name: "sku",
      type: "text",
      placeholder: "Sku",
      value: product.sku,
      required: true,
    },
    {
      label: "Price",
      name: "Price",
      type: "number",
      placeholder: "$12",
      value: product.Price,
      required: true,
    },
    {
      label: "Sale Price",
      name: "salePrice",
      type: "number",
      placeholder: "$12",
      value: product.salePrice,
      required: true,
    },
    {
      label: "Sales Start At",
      name: "saleStartAt",
      type: "date",
      value: product.saleStartAt,
      required: true,
    },
    {
      label: "Sales End At",
      name: "salesEndAt",
      type: "date",

      value: product.salesEndAt,
      required: true,
    },
  ];

  return (
    <div>
      <Form
        className='mx-4 border p-5 shadow-lg rounded mt-1'
        onSubmit={handleOnSubmit}
      >
        <h1>Edit Product</h1>
        <Row>
          <Form.Group className='mb-3'>
            <Form.Check
              name='status'
              type='switch'
              id='custom-switch'
              label='Switch'
              checked={product.status === "active"}
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
              {catList.map(({ name, slug }) => (
                <option
                  key={slug}
                  value={slug}
                  // selected={slug === product.slug}
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
              value={product.description}
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
    </div>
  );
};

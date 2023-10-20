import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, ProgressBar, Row } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAction,
  deleteProduct,
  fetchSingleProduct,
} from "../../pages/products/ProductAction";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { storage } from "../../config/firebase-config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { fetchAllCategories } from "../../pages/category/CatAction";

export const EditProductForm = () => {
  const [product, setProduct] = useState({});
  const [progress, setProgress] = useState(0);
  // const [thumbnail, setThumbnail] = useState();
  const [imgdelete, setImgDelete] = useState([]);
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
    SelectedProduct.slug !== product.slug && setProduct(SelectedProduct);
  }, [dispatch, id, SelectedProduct, product]);
  //   console.log(cat);

  const handleOnImgAttached = (e) => {
    const { files } = e.target;
    setImg([...files]);
  };
  // console.log(imgdelete);
  const handleOnChange = (e) => {
    let { checked, value, name } = e.target;
    console.log(name, value);

    if (name === "thumbnail") {
      if (imgdelete.includes(value)) {
        return alert("You cann't select delete");
      }
    }

    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setProduct({
      ...product,
      [name]: value,
    });
  };
  // console.log(product?.thumbnail);

  // const imgs = product.images; //this imgs is the selected images arrays

  const handleOnImgDelete = (e) => {
    const { checked, value } = e.target;

    // console.log(checked, name, value);
    if (checked) {
      // console.log(product.thumbnail);
      if (product.thumbnail === value) {
        return alert("You cannot delete selected thumbnail");
      }
      setImgDelete([...imgdelete, value]);
    } else {
      const filteredImgs = imgdelete.filter((img) => img !== value);
      // console.log(filteredImgs);
      setImgDelete(filteredImgs);
    }
  };
  // console.log(imgdelete);
  // console.log(filteredImgs);

  // console.log(product);
  const handleOnDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      //proceed to delete this product
      const result = await dispatch(deleteProduct(id));
      result && navigate("/products");
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // console.log({ slug, ...product });
    try {
      let oldImgToKeep = [];
      let imgUrls = [];
      // console.log(img);
      if (img?.length) {
        //loop through images
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
        imgUrls = await Promise.all(imgResp);
      }
      if (product.images) {
        //remove  images url
        oldImgToKeep = product.images.filter((img) => !imgdelete.includes(img));

        // add the url from product
        const obj = {
          ...product,
          images: [...oldImgToKeep, ...imgUrls],
        };
        dispatch(addProductAction(obj));
        setImgDelete([]);
      }
      // else {
      //   dispatch(
      //     addProductAction({
      //       ...product,
      //       slug,
      //       images: [...imgUrls],
      //     })
      //   );
      // }

      navigate("/products");
    } catch (error) {
      toast.error(error.message);
    }
    // console.log(filteredImgs);
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

  ///for thumbnail and delete

  // console.log("delete" + imgdelete, "thumbnail" + thumbnail);
  // if()
  // console.log(imgdelete);
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

          <div className='d-flex gap-2 '>
            {product?.images &&
              product?.images.map((item, id) => (
                <div
                  className='flex-column gap-3'
                  key={id}
                >
                  <div className='d-flex gap-5'>
                    <Form.Check
                      name='thumbnail'
                      type='radio'
                      label='Thumbnail'
                      value={item}
                      checked={product.thumbnail === item}
                      onChange={handleOnChange}
                    />
                  </div>
                  <img
                    key={id}
                    src={item}
                    alt='images'
                    style={{ width: "150px" }}
                  ></img>
                  <div className='flex-column'>
                    <Form.Check
                      name='delete'
                      type='checkbox'
                      label='Delete'
                      value={item}
                      checked={imgdelete.includes(item)}
                      onChange={handleOnImgDelete}
                    ></Form.Check>
                  </div>
                </div>
              ))}
          </div>
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
            variant='danger'
            className='text-center mb-2'
            onClick={handleOnDelete}
          >
            Delete
          </Button>
          <Button
            variant='success'
            type='submit'
            className='text-center'
          >
            Update
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

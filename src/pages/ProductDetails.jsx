import React, { useEffect } from "react";
import Header from "../components/Header";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../features/productSlice";
import Loader from "../components/Loader";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Button,
  Stack,
  TextField,
  Typography,
  Box,
  Breadcrumbs,
  Link,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Stars from "../components/Stars";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addToCart } from "../features/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, []);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      qty: "1",
    },
    validationSchema: Yup.object({
      qty: Yup.number()
        .integer("Product quantity must be an integer.")
        .moreThan(0, "Product qty must be greater than 0.")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(addToCart({ ...product, itemQuantity: parseInt(values.qty) }));
    },
  });

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      onClick={() => navigate("/")}
      sx={{ cursor: "pointer" }}
    >
      category
    </Link>,
    <Typography key="2" color="error">
      {product?.category}
    </Typography>,
  ];

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          justifyContent="center"
          p={3}
          sx={{ marginTop: `calc(var(--header-height) + 2rem)` }}
        >
          <Box
            sx={{
              maxWidth: 400,
              alignSelf: "flex-start",
            }}
          >
            <img
              src={product?.image}
              alt={product?.title}
              style={{ objectFit: "cover", width: 260 }}
            />
          </Box>
          <Stack sx={{ maxWidth: { xs: "100%", md: "600px" } }}>
            <Typography variant="h5" gutterBottom>
              {product?.title}
            </Typography>
            <Breadcrumbs
              separator={<ChevronRightIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs}
            </Breadcrumbs>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ margin: "0.2rem 0" }}
            >
              <Typography variant="body1" color="textSecondary">
                ${product?.price}
              </Typography>
              <Stars
                rate={product?.rating?.rate || Math.random() * 4 + 1}
                count={product?.rating?.count || 120}
              />
            </Box>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography mb={3} variant="body1" gutterBottom>
              {product?.description}
            </Typography>
            <Stack spacing={2} sx={{ width: { xs: "100%", sm: "70%" } }}>
              <Box
                display="flex"
                alignItems="center"
                gap="10px"
                sx={{
                  marginBottom: "1rem",
                  flex: 1,
                  width: "100%",
                }}
              >
                <Typography variant="p">Qty:</Typography>
                <TextField
                  sx={{ width: "100%" }}
                  type="number"
                  size="small"
                  name="qty"
                  value={values.qty}
                  onChange={handleChange}
                  error={Boolean(touched.qty && errors.qty)}
                  helperText={touched.qty && errors.qty}
                />
              </Box>
              <Button
                fullWidth
                variant="contained"
                endIcon={<ShoppingCartOutlinedIcon />}
                onClick={handleSubmit}
                color="secondary"
              >
                Add to Cart
              </Button>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default ProductDetails;

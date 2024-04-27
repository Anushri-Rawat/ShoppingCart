import React from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        firstName: Yup.string()
          .min(2, "Firstname must be at least 2 characters")
          .required("Required"),
        lastName: Yup.string()
          .min(2, "Lastname must be at least 2 characters")
          .required("Required"),
        password: Yup.string()
          .required("Required")
          .min(8, "Password must be at least 8 characters")
          .max(16, "Password must be less than 16 characters")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          ),
      }),
      onSubmit: (values) => {
        dispatch(addUser(values));
        toast.success("User successfully registered.");
        navigate("/login");
      },
    });

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", height: "100vh", background: "#e3f2fd" }}
    >
      <Card>
        <CardContent>
          <Typography
            variant="h5"
            sx={{ textAlign: "center" }}
            fontWeight={600}
          >
            Welcome to ShopVista!
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{ maxWidth: 400, margin: "auto" }}
          >
            <TextField
              fullWidth
              type="text"
              label="First Name"
              name="firstName"
              variant="outlined"
              margin="normal"
              onBlur={handleBlur}
              value={values.firstName}
              onChange={handleChange}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
            <TextField
              fullWidth
              type="text"
              label="Last Name"
              name="lastName"
              variant="outlined"
              margin="normal"
              onBlur={handleBlur}
              value={values.lastName}
              onChange={handleChange}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
            <TextField
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
              margin="normal"
              name="email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              variant="outlined"
              margin="normal"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button type="submit" variant="contained" color="secondary">
                Register
              </Button>
              <Link
                to="/login"
                style={{ paddingLeft: "10px", fontSize: "12px", color: "#000" }}
              >
                Already a User?Login here
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Register;

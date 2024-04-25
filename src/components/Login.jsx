import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/userSlice";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  const formSubmitHandler = (values) => {
    const user = users.find((user) => user.email === values.email);
    if (!user) {
      toast.error("Email or password is invalid.");
      return;
    }

    if (user.password === values.password) {
      dispatch(login());
      navigate("/");
    } else {
      toast.error("Email or password is invalid.");
    }
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: formSubmitHandler,
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
              type="email"
              label="Email"
              name="email"
              variant="outlined"
              margin="normal"
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
              value={values.password}
              onChange={handleChange}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            <Link
              to="/register"
              style={{ paddingLeft: "10px", fontSize: "12px" }}
            >
              New User?Register here
            </Link>
          </form>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Login;

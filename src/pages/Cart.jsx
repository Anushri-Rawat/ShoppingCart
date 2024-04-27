import {
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  IconButton,
  TableContainer,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCartItemQty,
  getTotal,
  removeFromCart,
} from "../features/cartSlice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import Header from "../components/Header";
import { toast } from "react-toastify";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, cartTotalAmount } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info("Your cart is clear now!");
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleDecreaseCart = (item) => {
    dispatch(decreaseCartItemQty(item));
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, itemQuantity: 1 }));
  };

  const handleCheckout = () => {
    toast.success("You have successfully purchased all your items!");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <>
      <Header />
      <Stack
        justifyContent="center"
        sx={{
          marginTop: `calc(var(--header-height) + 1rem)`,
          padding: { xs: "1rem", md: "0 4rem 2rem" },
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 500, textAlign: "center" }}
        >
          Shopping Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Stack justifyContent="center" spacing={2} alignItems="center">
            <Typography variant="body1">
              Your cart is currently empty!
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/")}
            >
              <ArrowLeftIcon />
              Continue Shopping
            </Button>
          </Stack>
        ) : (
          <>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>PRODUCT</TableCell>
                    <TableCell align="right">PRICE</TableCell>
                    <TableCell align="right">QUANTITY</TableCell>
                    <TableCell align="right">TOTAL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems &&
                    cartItems.map((cartItem) => (
                      <TableRow key={cartItem.id}>
                        <TableCell component="th" scope="row">
                          <Stack direction="row" spacing={2}>
                            <img
                              src={cartItem.image}
                              alt={cartItem.title}
                              style={{ width: "100px", height: "100px" }}
                            />
                            <Stack alignItems={"flex-start"}>
                              <Typography variant="subtitle1">
                                {cartItem.title}
                              </Typography>
                              <Typography variant="body2">
                                {cartItem.category}
                              </Typography>
                              <Button
                                onClick={() => handleRemoveFromCart(cartItem)}
                                variant="text"
                                size="small"
                              >
                                Remove
                              </Button>
                            </Stack>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">${cartItem.price}</TableCell>
                        <TableCell align="right">
                          <Box
                            display="inline-flex"
                            gap="10px"
                            alignItems="center"
                            justifyContent="flex-end"
                            sx={{ border: "1px solid #777" }}
                          >
                            <IconButton
                              onClick={() => handleAddToCart(cartItem)}
                            >
                              <AddIcon />
                            </IconButton>
                            <p
                              style={{ minWidth: "20px", textAlign: "center" }}
                            >
                              {cartItem.itemQuantity}
                            </p>
                            <IconButton
                              onClick={() => handleDecreaseCart(cartItem)}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>
                          ${(cartItem.price * cartItem.itemQuantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              display="flex"
              flexDirection={{ xs: "column-reverse", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "center", sm: "flex-start" }}
              gap="15px"
              sx={{ marginTop: "1rem" }}
            >
              <Button variant="outlined" onClick={handleClearCart}>
                Clear Cart
              </Button>
              <Stack spacing={1}>
                <Box
                  display="flex"
                  alignItem="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography
                    variant="body1"
                    className="amount"
                    sx={{ fontWeight: 600 }}
                  >
                    ${cartTotalAmount.toFixed(2)}
                  </Typography>
                </Box>
                <Typography variant="body2" gutterBottom>
                  Taxes and shipping calculated at checkout
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCheckout}
                >
                  Check out
                </Button>
                <Button
                  variant="text"
                  onClick={() => navigate("/")}
                  size="small"
                >
                  <ArrowLeftIcon />
                  Continue Shopping
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </Stack>
    </>
  );
};

export default Cart;

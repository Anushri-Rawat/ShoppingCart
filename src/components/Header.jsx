import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Button,
  Box,
  Badge,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { clearCart } from "../features/cartSlice";

const Header = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ height: "var(--header-height)" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link component={RouterLink} to="/" color="inherit" underline="none">
            ShopVista
          </Link>
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            gap: isSmallScreen ? "0" : "1rem",
          }}
        >
          <Button
            component={Typography}
            onClick={logoutHandler}
            color="inherit"
          >
            Logout
          </Button>
          <Button component={RouterLink} to="/cart" color="inherit" edge="end">
            <Badge
              badgeContent={`${cartTotalQuantity}`}
              color="secondary"
              max={99}
            >
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

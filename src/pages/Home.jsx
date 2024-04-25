import React, { useEffect } from "react";
import {
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import GridProducts from "../components/GridProducts";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  fetchProductCategories,
} from "../features/productSlice";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Sort from "../components/Sort";
import ListProducts from "../components/ListProducts";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, error, grid_view, category } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchProductCategories());
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <Grid
          container
          justifyContent="center"
          sx={{
            margin: "calc(var(--header-height) + 1rem) 0 0.5rem",
            padding: "0 2rem",
          }}
        >
          {/* <Hidden mdDown>
            <Grid item sm={2} paddingRight={"1rem"}>
              <List>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  paddingLeft={"12px"}
                >
                  Category
                </Typography>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="All" />
                  </ListItemButton>
                </ListItem>
                {category.map((c, idx) => (
                  <ListItem disablePadding key={idx}>
                    <ListItemButton>
                      <ListItemText primary={c} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Hidden> */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Sort />
              </Grid>
              <Grid item xs={12}>
                {grid_view ? <GridProducts /> : <ListProducts />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;

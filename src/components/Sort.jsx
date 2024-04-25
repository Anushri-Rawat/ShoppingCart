import React, { useEffect, useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Hidden,
  Tooltip,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterValue,
  setGridView,
  setListView,
} from "../features/productSlice";

const Sort = () => {
  const dispatch = useDispatch();
  const { products, grid_view, category } = useSelector(
    (state) => state.product
  );
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(setFilterValue(filter));
    calcProductsLength();
  }, [filter]);

  function calcProductsLength() {
    let filteredData = products;
    if (filter !== "All") {
      filteredData = products.filter((item) => item.category === filter);
    }
    return filteredData.length;
  }

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Tooltip title={"Grid view"}>
          <Button
            variant={grid_view ? "contained" : "text"}
            onClick={() => dispatch(setGridView())}
          >
            <GridViewIcon />
          </Button>
        </Tooltip>
        <Tooltip title={"List view"}>
          <Button
            variant={!grid_view ? "contained" : "text"}
            onClick={() => dispatch(setListView())}
          >
            <MenuIcon />
          </Button>
        </Tooltip>
      </Grid>
      <Hidden smDown>
        <Grid item>
          <p>{`${calcProductsLength()} Product Available`}</p>
        </Grid>
      </Hidden>

      <Grid item>
        {/* <FormControl fullWidth sx={{ width: "150px" }} size="small">
          <InputLabel htmlFor="sort">Sort</InputLabel>
          <Select value="">
            <MenuItem value="lowest">Price (lowest)</MenuItem>
            <MenuItem value="highest">Price (highest)</MenuItem>
            <MenuItem value="a-z">Price (a-z)</MenuItem>
            <MenuItem value="z-a">Price (z-a)</MenuItem>
          </Select>
        </FormControl> */}
        <FormControl fullWidth sx={{ width: "150px" }} size="small">
          <InputLabel htmlFor="category">Category</InputLabel>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="All" selected>
              All
            </MenuItem>
            {category.map((cat, idx) => (
              <MenuItem value={cat} key={idx}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Sort;

import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductCategories } from "../features/productSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchProductCategories());
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <List>
          {category.map((c,idx)=><ListItem disablePadding>
            <ListItemButton>
              <ListItemText>{c}</ListItemText>
            </ListItemButton>
          </ListItem>)}
        </List>
      </Grid>
    </Grid>
  );
};

export default Filters;

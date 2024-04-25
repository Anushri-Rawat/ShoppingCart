import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import Stars from "./Stars";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GridProducts = () => {
  const { products, filter } = useSelector((state) => state.product);
  const navigate = useNavigate();

  let filteredData = products;
  if (filter !== "All") {
    filteredData = products.filter((item) => item.category === filter);
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      {filteredData.map(({ title, id, image, price, rating }) => (
        <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
          <Card
            onClick={() => navigate(`/product/${id}`)}
            sx={{
              height: "100%",
              cursor: "pointer",
              ":hover": {
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              },
            }}
          >
            <CardMedia
              component="img"
              height="150"
              image={image}
              alt={title}
              sx={{ objectFit: "contain" }}
            />
            <CardContent sx={{ paddingBottom: "16px!important" }}>
              <Typography variant="subtitle1" component="h5" gutterBottom>
                {title}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body1" color="textSecondary">
                  ${price}
                </Typography>
                <Stars
                  rate={rating.rate || Math.random() * 4 + 1}
                  count={rating.count || 120}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GridProducts;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import Stars from "./Stars";

const ListProducts = () => {
  const { products, filter } = useSelector((state) => state.product);
  const navigate = useNavigate();

  let filteredData = products;
  if (filter !== "All") {
    filteredData = products.filter((item) => item.category === filter);
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      {filteredData.map(({ title, image, id, price, description, rating }) => (
        <Grid item key={id} xs={12} md={12}>
          <Card
            sx={{
              display: "flex",
              padding: "16px",
              gap: "2rem",
              cursor: "pointer",
              ":hover": {
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              },
            }}
          >
            <CardMedia
              component="img"
              image={image}
              alt={title}
              sx={{
                objectFit: "contain",
                width: "20%",
                height: "10rem",
              }}
            />
            <CardContent sx={{ padding: "0!important", width: "80%" }}>
              <Typography variant="h6" component="h3" gutterBottom>
                {title}
              </Typography>
              <Box display="flex" alignItems="center" gap="1rem" gutterBottom>
                <Typography variant="body1" color="textSecondary">
                  ${price}
                </Typography>
                <Stars
                  rate={rating.rate || Math.random() * 4 + 1}
                  count={rating.count || 120}
                />
              </Box>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {description}
              </Typography>
              <Button
                component={Link}
                to={`/product/${id}`}
                variant="contained"
                color="primary"
              >
                Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListProducts;
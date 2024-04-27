import { Typography, Stack } from "@mui/material";
import React from "react";

const NotFoundPage = () => {
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
      <Typography variant="h5" fontWeight={600}>
        Page not Found!!
      </Typography>
    </Stack>
  );
};

export default NotFoundPage;

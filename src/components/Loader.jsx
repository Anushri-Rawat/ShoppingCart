import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Box} from "@mui/material";

const LoaderWrapper = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight:
    "calc(100vh - (var(--header-height) + var(--footer-height) + 18rem))",
  marginTop: "var(--header-height)",
};

const Loader = () => {
  return (
    <Box sx={LoaderWrapper}>
      <CircularProgress sx={{ width: "6rem", height: "6rem" }} />
    </Box>
  );
};

export default Loader;

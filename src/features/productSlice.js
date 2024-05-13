import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  product: {},
  category: [],
  filter: "All",
  grid_view: true,
  sort: "reset",
};

const API_URL = "https://fakestoreapi.com";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId) => {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  }
);
export const fetchProductCategories = createAsyncThunk(
  "products/fetchProductCategories",
  async () => {
    const response = await axios.get(`${API_URL}/products/categories`);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setGridView: (state) => {
      state.grid_view = true;
    },
    setListView: (state) => {
      state.grid_view = false;
    },
    setFilterValue: (state, action) => {
      state.filter = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      }),
      builder.addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
      builder.addCase(fetchProductById.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      }),
      builder.addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder.addCase(fetchProductCategories.fulfilled, (state, action) => {
      state.category = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setGridView, setListView, setFilterValue, setSort } =
  productSlice.actions;

export default productSlice.reducer;

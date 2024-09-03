import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

export const updatePrices = createAsyncThunk(
  'portfolio/updatePrices',
  async (_, { getState }) => {
    const { tokens } = getState().portfolio;
    const tokenIds = tokens.map(token => token.id).join(',');
    const response = await axios.get(`${API_BASE_URL}/simple/price`, {
      params: {
        ids: tokenIds,
        vs_currencies: 'usd',
      },
    });
    return response.data;
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    tokens: [],
    totalValue: 0,
    history: [],
  },
  reducers: {
    addToken: (state, action) => {
      state.tokens.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatePrices.fulfilled, (state, action) => {
      state.tokens.forEach(token => {
        if (action.payload[token.id]) {
          token.currentPrice = action.payload[token.id].usd;
        }
      });
      state.totalValue = state.tokens.reduce((sum, token) => sum + token.amount * token.currentPrice, 0);
      state.history.push({ timestamp: Date.now(), value: state.totalValue });
    });
  },
});

export const { addToken } = portfolioSlice.actions;
export default portfolioSlice.reducer;
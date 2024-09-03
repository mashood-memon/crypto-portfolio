import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToken, updatePrices } from '../store/portfolioSlice';
import axios from 'axios';

const AddToken = () => {
  const [id, setId] = useState('');
  const [amount, setAmount] = useState('');
  const [avgPrice, setAvgPrice] = useState('');
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 250, 
            page: 1,
            sparkline: false
          }
        });
        setCoins(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching coins:', error);
        setIsLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCoin = coins.find(coin => coin.id === id);
    dispatch(addToken({ 
      id, 
      name: selectedCoin.name, 
      symbol: selectedCoin.symbol,
      amount: Number(amount), 
      avgPrice: Number(avgPrice), 
      currentPrice: selectedCoin.current_price 
    }));
    dispatch(updatePrices());
    setId('');
    setAmount('');
    setAvgPrice('');
  };

  if (isLoading) {
    return <div>Loading coins...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6 bg-white p-4 rounded-lg shadow">
      <select 
        value={id} 
        onChange={(e) => setId(e.target.value)} 
        className="flex-1 p-2 rounded bg-gray-100"
        required
      >
        <option value="">Select Token</option>
        {coins.map(coin => (
          <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol.toUpperCase()})</option>
        ))}
      </select>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Amount" 
        className="flex-1 p-2 rounded bg-gray-100"
        required 
      />
      <input 
        type="number" 
        value={avgPrice} 
        onChange={(e) => setAvgPrice(e.target.value)} 
        placeholder="Avg Price" 
        className="flex-1 p-2 rounded bg-gray-100"
        required 
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
};

export default AddToken;
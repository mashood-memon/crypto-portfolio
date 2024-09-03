import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePrices } from './store/portfolioSlice';
import AddToken from './components/AddToken';
import TokenList from './components/TokenList';
import PortfolioChart from './components/PortfolioChart';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPrices = () => dispatch(updatePrices());
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Crypto Portfolio</h1>
      <AddToken />
      <div className="flex flex-col md:flex-row gap-6">
        <TokenList />
        <PortfolioChart />
      </div>
    </div>
  );
}

export default App;
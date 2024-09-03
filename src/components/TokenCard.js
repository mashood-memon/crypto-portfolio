import React from 'react';

const TokenCard = ({ token }) => {
  const { name, symbol, amount, avgPrice, currentPrice } = token;
  const totalValue = amount * currentPrice;
  const initialValue = amount * avgPrice;
  const profitLoss = totalValue - initialValue;
  const profitLossPercentage = (profitLoss / initialValue) * 100;

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center">
      <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4">
        {symbol.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{name} ({symbol.toUpperCase()})</h3>
        <p className="text-sm text-gray-600">{amount} {symbol.toUpperCase()} | Avg: ${avgPrice.toFixed(2)}</p>
        <p className={`text-sm ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${Math.abs(profitLoss).toFixed(2)} ({profitLossPercentage.toFixed(2)}%)
        </p>
      </div>
    </div>
  );
};

export default TokenCard;
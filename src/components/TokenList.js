import React from 'react';
import { useSelector } from 'react-redux';
import TokenCard from './TokenCard';

const TokenList = () => {
  const tokens = useSelector(state => state.portfolio.tokens);

  return (
    <div className="bg-white p-4 rounded-lg shadow flex-1">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Tokens</h2>
      {tokens.map(token => (
        <TokenCard
          key={token.id}
          token={token}
        />
      ))}
    </div>
  );
};

export default TokenList;
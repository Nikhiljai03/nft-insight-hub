
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Repeat, TrendingUp } from 'lucide-react';
import { TransactionHistoryItem } from '@/utils/mockDataGenerators';

interface NFTTransactionTableProps {
  transactions: TransactionHistoryItem[];
}

const NFTTransactionTable: React.FC<NFTTransactionTableProps> = ({ transactions }) => {
  const getEventIcon = (event: string) => {
    switch (event) {
      case 'Sale':
      case 'Last Sale':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'Transfer':
        return <Repeat className="h-4 w-4 text-blue-500" />;
      case 'Listing':
        return <TrendingUp className="h-4 w-4 text-purple-500" />;
      case 'Offer':
        return <ArrowDown className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-auto max-h-80">
      <table className="w-full">
        <thead className="bg-secondary/10">
          <tr>
            <th className="text-left p-3 rounded-tl-lg">Event</th>
            <th className="text-left p-3 hidden md:table-cell">Date</th>
            <th className="text-left p-3 hidden md:table-cell">Wallet</th>
            <th className="text-right p-3">Price</th>
            <th className="text-right p-3 rounded-tr-lg">Change</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="border-b border-secondary/10">
              <td className="p-3">
                <div className="flex items-center gap-2">
                  {getEventIcon(transaction.event)}
                  <span>{transaction.event}</span>
                </div>
              </td>
              <td className="p-3 hidden md:table-cell">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="p-3 hidden md:table-cell">
                <span className="font-mono text-xs">{transaction.wallet}</span>
              </td>
              <td className="p-3 text-right">{transaction.price} ETH</td>
              <td className="p-3 text-right">
                {transaction.priceChange !== 0 && (
                  <Badge variant={transaction.priceChange > 0 ? "default" : "destructive"} className="ml-auto">
                    {transaction.priceChange > 0 ? '+' : ''}{transaction.priceChange.toFixed(1)}%
                  </Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NFTTransactionTable;

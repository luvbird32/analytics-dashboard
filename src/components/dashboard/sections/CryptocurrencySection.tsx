
import { DollarSign } from 'lucide-react';
import { CryptoChart } from '../charts/CryptoChart';
import { CandlestickChart } from '../charts/CandlestickChart';
import { CryptoData, CandlestickData } from '@/types/dashboard';

interface CryptocurrencySectionProps {
  cryptoData: CryptoData[];
  candlestickData: CandlestickData[];
}

/**
 * Cryptocurrency analytics section with separate rows for better visual experience
 */
export const CryptocurrencySection = ({
  cryptoData,
  candlestickData
}: CryptocurrencySectionProps) => {
  return (
    <div className="space-y-8 lg:space-y-10">
      <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
        <DollarSign className="h-5 w-5 lg:h-6 lg:w-6" />
        Cryptocurrency Analytics
      </h2>
      
      {/* Crypto Chart - Full Width Row */}
      <div className="w-full">
        <CryptoChart data={cryptoData} symbol="BTC" />
      </div>
      
      {/* Candlestick Chart - Full Width Row */}
      <div className="w-full">
        <CandlestickChart data={candlestickData} />
      </div>
    </div>
  );
};

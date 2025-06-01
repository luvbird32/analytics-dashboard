
import { CryptoService } from '../crypto/cryptoService';

describe('CryptoService', () => {
  describe('generateCryptoData', () => {
    it('generates crypto data for 24 hours', () => {
      const data = CryptoService.generateCryptoData();
      
      expect(data).toHaveLength(24);
      expect(data[0]).toHaveProperty('timestamp');
      expect(data[0]).toHaveProperty('price');
      expect(data[0]).toHaveProperty('volume');
      expect(data[0]).toHaveProperty('marketCap');
      expect(data[0]).toHaveProperty('change24h');
    });

    it('generates valid price values', () => {
      const data = CryptoService.generateCryptoData();
      
      data.forEach(item => {
        expect(typeof item.price).toBe('number');
        expect(item.price).toBeGreaterThan(0);
        expect(typeof item.volume).toBe('number');
        expect(item.volume).toBeGreaterThan(0);
      });
    });
  });

  describe('generateCandlestickData', () => {
    it('generates candlestick data for 30 days', () => {
      const data = CryptoService.generateCandlestickData();
      
      expect(data).toHaveLength(30);
      expect(data[0]).toHaveProperty('date');
      expect(data[0]).toHaveProperty('open');
      expect(data[0]).toHaveProperty('high');
      expect(data[0]).toHaveProperty('low');
      expect(data[0]).toHaveProperty('close');
      expect(data[0]).toHaveProperty('volume');
    });

    it('ensures high >= max(open, close) and low <= min(open, close)', () => {
      const data = CryptoService.generateCandlestickData();
      
      data.forEach(candle => {
        expect(candle.high).toBeGreaterThanOrEqual(Math.max(candle.open, candle.close));
        expect(candle.low).toBeLessThanOrEqual(Math.min(candle.open, candle.close));
      });
    });
  });
});

const mockRates: Record<string, number> = {
  USD: 0.18, // Dólar
  EUR: 0.16, // Euro
  GBP: 0.14, // Libra
};

export type QuoteResult = {
  rate: number;
  date: string;
};

// Simula uma requisição que pode falhar aleatoriamente
export function getMockedConversion(currency: string): Promise<QuoteResult> {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.15; // 85% chance de sucesso
    setTimeout(() => {
      if (success && mockRates[currency]) {
        resolve({
          rate: mockRates[currency],
          date: new Date().toLocaleString(),
        });
      } else {
        reject(new Error('Falha ao obter cotação'));
      }
    }, 800);
  });
}

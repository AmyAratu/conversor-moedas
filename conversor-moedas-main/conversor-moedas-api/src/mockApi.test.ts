// mockapi.test.ts
import { cotacoesFixas, Currency } from "./mockapi";

describe("mockapi.ts - cotacoesFixas", () => {
  it("deve ter cotações definidas para todas as moedas", () => {
    const moedas: Currency[] = ["USD", "EUR", "GBP"];
    moedas.forEach((moeda) => {
      expect(cotacoesFixas[moeda]).toBeGreaterThan(0);
    });
  });

  it("deve ter valores corretos", () => {
    expect(cotacoesFixas.USD).toBe(9.0);
    expect(cotacoesFixas.EUR).toBe(6.0);
    expect(cotacoesFixas.GBP).toBe(7.0);
  });
});

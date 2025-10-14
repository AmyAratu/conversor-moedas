import React, { useState } from "react";

type Currency = "USD" | "EUR" | "GBP";

const moedas: { label: string; value: Currency }[] = [
    { label: "USD/U.S. Dólar", value: "USD" },
    { label: "EUR/Euro", value: "EUR" },
    { label: "GBP/Libra Esterlina", value: "GBP" },
];

function App() {
    const [valor, setValor] = useState("");
    const [moeda, setMoeda] = useState<Currency>("USD");
    const [resultado, setResultado] = useState<string | null>(null);
    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(false);

    const converter = async () => {
        const valorNum = Number(valor.replace(",", "."));
        if (!valor || isNaN(valorNum) || valorNum <= 0) {
            setErro("Informe um valor válido em reais.");
            setResultado(null);
            return;
        }

        setCarregando(true);
        setErro(null);
        setResultado(null);

        try {
            const url = `https://economia.awesomeapi.com.br/json/last/${moeda}-BRL`;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);

            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) throw new Error("Erro de rede");

            const data = await response.json();
            const key = `${moeda}BRL`;
            const cotacaoObj = data[key];

            if (!cotacaoObj || !cotacaoObj.bid) {
                throw new Error("Não foi possível obter a cotação");
            }

            const convertido = (valorNum / Number(cotacaoObj.bid)).toFixed(2);
            const label = moeda === "USD" ? "$" : moeda === "EUR" ? "€" : "£";

            setResultado(`${moeda} ${label} ${convertido}`);
        } catch (err) {
            console.error(err);
            if ((err as any).name === "AbortError") {
                setErro("A requisição demorou demais. Tente novamente.");
            } else {
                setErro("Não foi possível buscar a cotação. Tente novamente.");
            }
            setResultado(null);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
                <h1 className="text-xl font-bold mb-4">Conversor de moedas</h1>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">BRL</label>
                    <input
                        type="text"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        placeholder="R$ 100,00"
                        className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Selecionar moeda</label>
                    <select
                        value={moeda}
                        onChange={(e) => setMoeda(e.target.value as Currency)}
                        className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    >
                        {moedas.map((m) => (
                            <option key={m.value} value={m.value}>
                                {m.label}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={converter}
                    disabled={!valor || carregando}
                    className="w-full bg-green-700  p-2 rounded-md font-semibold transition-colors"
                >
                    {carregando ? "Convertendo..." : "Converter"}
                </button>

                {resultado && <p className="mt-4 text-green-700 font-medium">{resultado}</p>}
                {erro && <p className="mt-4 text-red-600 font-medium">{erro}</p>}
            </div>
        </div>
    );
}

export default App;

import { useEffect } from "react";
function App() {
  useEffect(() => {
    let ws = new WebSocket("wss://api.huobi.pro/ws");
    ws.onopen = (arg) => {
      ws.send(
        JSON.stringify({
          sub: "market.btcusdt.bbo",
          id: "efsdd",
        })
      );
      ws.onmessage = (arg) => console.log("thisismsg", arg);
    };

    console.log(ws);
  }, []);

  return <main>React⚛️ + Vite⚡ + Replit🌀</main>;
}

export default App;

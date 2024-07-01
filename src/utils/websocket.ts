// websocket.js
import { WebSocketServer } from "ws";

let wss: any;

export const initWebSocketServer = (server: any) => {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws: any) => {
    console.log("Client connected");

    ws.on("message", (message: any) => {
      console.log("Received:", message);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log("WebSocket server initialized");
};

export const broadcast = (data: any) => {
  if (!wss) {
    console.error("WebSocket server not initialized");
    return;
  }
  wss.clients.forEach((client: any) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

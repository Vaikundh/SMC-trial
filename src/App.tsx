import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { LightstreamerClient, Subscription } from "lightstreamer-client-web";
import { LLA, Vector3 } from "./vectors";
import { ecefToLla } from "./math";

const DATA = ["USLAB000032", "USLAB000033", "USLAB000034"];

function App() {
  const [pos, setPos] = useState<Vector3>({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const client = new LightstreamerClient(
      "https://push.lightstreamer.com",
      "ISSLIVE"
    );

    client.connect();

    const subscription = new Subscription("MERGE", DATA, ["Value"]);
    client.subscribe(subscription);

    subscription.addListener({
      onItemUpdate: (update) => {
        switch (update.getItemName()) {
          case "USLAB000032":
            setPos((p) => ({ ...p, x: +update.getValue("Value") * 1000 }));
            break;
          case "USLAB000033":
            setPos((p) => ({ ...p, y: +update.getValue("Value") * 1000 }));
            break;
          case "USLAB000034":
            setPos((p) => ({ ...p, z: +update.getValue("Value") * 1000 }));
            break;
        }
      },
    });

    return () => {
      client.disconnect();
    };
  }, []);

  return <div className="App">{JSON.stringify(ecefToLla(pos))}</div>;
}

export default App;

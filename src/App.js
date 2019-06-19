import React, { Component } from "react";
import Tabs from "./components/Tabs/Tabs";
import NAV_MENU from "./navigation.json";

import "./App.css";

function App() {
  return (
    <div className="App">
        <Tabs menu={NAV_MENU}/>
    </div>
  )
}

export default App;

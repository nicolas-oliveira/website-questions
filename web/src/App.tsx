import React from "react";
import GlobalStyle from "./styles/globalStyle";
import Home from "./pages/Home/index";

export default function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Home />
    </div>
  );
}

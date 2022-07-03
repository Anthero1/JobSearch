import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Fav from "./pages/Fav";
import Account from "./pages/Account";
import "./App.css";

function App() {
  let Component;

  switch (window.location.pathname) {
    case "/":
      Component = Home;
      break;
    case "/favorites":
      Component = Fav;
      break;
    case "/account":
      Component = Account;
      break;
  }
  return (
    <div className="App">
      <Navbar />
      <Component />
    </div>
  );
}

export default App;

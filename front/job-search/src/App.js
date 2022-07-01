import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <Main />
      <input type="text" placeholder="Search"></input>
      <button>Search</button>
    </div>
  );
}

import React from "react";
import "./Home.css";
const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <input type="text" className="mainTxt" placeholder="Search"></input>
      <button className="search">Go</button>
    </div>
  );
};

export default Home;

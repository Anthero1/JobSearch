import React, { useState } from "react";
import "./Home.css";

function Home() {
  const [data, setData] = useState({
    main: "a",
    location: "Ottawa",
    range: "100",
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  function onSubmit() {
    localStorage.setItem("info", JSON.stringify(data));

    window.location.href = "/search";
    // console.log("working");
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <input
        onChange={(e) => handle(e)}
        id="main"
        value={data.main}
        type="text"
        className="mainTxt"
        placeholder="Search"
      ></input>

      <button className="search" onClick={() => onSubmit(data.main)}>
        Go
      </button>
    </div>
  );
}

export default Home;

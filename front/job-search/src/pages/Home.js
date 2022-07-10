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

  function submit(e) {
    e.preventDefault();

    console.log("working");
    fetch("/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
      <form onSubmit={(e) => submit(e)}>
        <input
          onChange={(e) => handle(e)}
          id="main"
          value={data.name}
          type="text"
          className="mainTxt"
          placeholder="Search"
        ></input>
        <button className="search">Go</button>
      </form>
    </div>
  );
}

export default Home;

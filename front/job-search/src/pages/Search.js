import React, { useState } from "react";
import "./Search.css";

function Search() {
  let data = JSON.parse(localStorage.getItem("info"));
  const [info, setInfo] = React.useState(null);

  let res = "";

  async function getData() {
    let list = [];
    let state;

    res = await fetch("/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then((response) => response.json())
      .then((data) => data);

    res = JSON.parse(res);

    for (let i = 0; i < Object.keys(res).length; i++) {
      // FORMAT STUFF IN HERE
      let temp = [];
      Object.keys(res[i]).forEach((item) => temp.push(res[i][item]));
      list.push(temp);
    }

    state = { listitems: list };
    // document.getElementById("container").innerHTML = "";
    for (let i = 0; i < Object.keys(res).length; i++) {
      const lst = document.createElement("ul");
      lst.setAttribute("id", "mainlist" + i);
      document.getElementById("listContainer").appendChild(lst);
      //   console.log(state.listitems[0].length);
      for (let j = 0; j < state.listitems[i].length; j++) {
        const test = document.createElement("li");
        test.innerHTML = state.listitems[i][j];
        switch (j) {
          case 0:
            test.setAttribute("class", "jobTitle");
            console.log("working");
        }

        document.getElementById("mainlist" + i).appendChild(test);
      }
    }
  }

  getData();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div className="container">
        <div id="listContainer">
          <ul id="mainlist"></ul>
        </div>
      </div>
    </div>
  );
}

export default Search;

import React, { useEffect, useState } from "react";
import "./Fav.css";

function Fav({ dataArray }) {
  //TODO: MAKE THIS LIST FROM A DATABASE
  let state = {
    listitems: ["fasav1", "fav2", "asdaskjldfhaskljdfhkljds"],
  };
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  // alert(this.state.data);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        fontSize: "30pt",
      }}
    >
      <React.Fragment>
        <ul className="fav-list">
          {state.listitems.map((listitem) => (
            <li>{listitem}</li>
          ))}
        </ul>
        <p>{!data ? "Loading..." : data}</p>
      </React.Fragment>
    </div>
  );
}

export default Fav;

import React from "react";
import "./Fav.css";

function Fav() {
  //TODO: MAKE THIS LIST FROM A DATABASE

  let lst;
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  if (typeof data == "string") {
    lst = data.split(" ");
  } else {
    lst = [];
  }
  let state = {
    listitems: lst,
  };

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
      </React.Fragment>
    </div>
  );
}

export default Fav;

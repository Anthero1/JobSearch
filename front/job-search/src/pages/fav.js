import React from "react";
import "./Fav.css";

class About extends React.Component {
  //TODO: MAKE THIS LIST FROM A DATABASE
  state = {
    listitems: ["fav1", "fav2", "asdaskjldfhaskljdfhkljds"],
  };
  render() {
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
            {this.state.listitems.map((listitem) => (
              <li>{listitem}</li>
            ))}
          </ul>
        </React.Fragment>
      </div>
    );
  }
}

export default About;

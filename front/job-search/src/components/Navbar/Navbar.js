import React from "react";
import { MenuItems } from "./MenuItems";
import { Button } from "../Button";
import "./Navbar.css";

class Navbar extends React.Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  render() {
    // if (window.location.pathname == "/") {
    //   document.getElementById("main").style.display = "black";
    // }
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
          Indubitably<i className="fab fa-rebel"></i>
        </h1>
        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>

        {window.location.pathname != "/" ? (
          <input
            // onChange={(e) => handle(e)}
            id="main"
            type="text"
            className="mainTxt"
            placeholder="Search"
          ></input>
        ) : null}
        {window.location.pathname != "/" ? (
          <button className="search" /*onClick={() => onSubmit(data.main}*/>
            Go
          </button>
        ) : null}
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
        <Button>Sign Up</Button>
      </nav>
    );
  }
}
export default Navbar;

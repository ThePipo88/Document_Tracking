import React from "react";
import avatar from "../../assets/user.png";
import Cookies from "universal-cookie";

function Navbar(props) {
  
  const name = props.name;

  const cookies = new Cookies();

  const nombre = cookies.get("nombreUsuario");

  return (
    <div className="navbar">
      <h1>{name}</h1>
      <div className="info">
        <h4>{nombre}</h4>
        <div className="avatar">
          <img src={avatar} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

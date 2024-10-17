import React from "react";
import { IoMenu } from "react-icons/io5";
import { LiaCartPlusSolid } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import "./styles.css";

export default function Cabecalho() {
  return (
    <div>
      <header className="headerbar">
        <div className="content">
        <div className="content1">
          <IoMenu  size="35"/>
          <p>MENU</p>
        </div>
        <LiaCartPlusSolid size="55"/>
        </div>
        <div>
        </div>
        <div className="search">
          <input placeholder="Buscar Produtos"></input>
          <IoIosSearch size="30"/>
        </div>
        <div className="losfavoritos">
          <h1>
            FIT WEAR
          </h1>
        </div>
        <FaUser size="30"/>
      </header>
    </div>
  );
}
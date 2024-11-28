import React from "react";
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Rodape() {
  return (
    <footer>
      <div className="footer1">
        <Link className="footercontent" to="#">
          <BsFillTelephoneFill />
          <h3>Contato</h3>
        </Link>
        <Link className="footercontent" to="#">
          <IoLogoWhatsapp />
          <h3>Whatzap</h3>
        </Link>
        <Link className="footercontent" to="#">
          <AiFillInstagram />

          <h3>Instagram</h3>
        </Link>
        <Link className="footercontent" to="#">
          <FaFacebook />
          <h3>Facebook</h3>
        </Link>
        <Link className="footercontent" to="#">
          <MdEmail />
          <h3>Email</h3>
        </Link>
      </div>
      <p>Copyright © 2024-2024 sesisenaiorganization</p>
    </footer>
  );
}

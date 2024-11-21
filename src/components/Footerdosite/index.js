import React from "react";
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";

export default function Rodape() {
    return(
        <footer>
        <div className="footer1">
        <div className="footercontent">
        <BsFillTelephoneFill />
          <h3>Contato</h3>
        </div>
        <div className="footercontent">
        <IoLogoWhatsapp />
          <h3>Whatzap</h3>

        </div>
        <div className="footercontent">
          <AiFillInstagram />

          <h3>Instagram</h3>
        </div>
        <div className="footercontent">
        <FaFacebook />
          <h3>Facebook</h3>
          

        </div>
        <div className="footercontent">
        <MdEmail />
          <h3>Email</h3>
        </div>
        </div>
        <p>Copyright © 2024-2024 sesisenaiorganization</p>
      </footer>
    )
}
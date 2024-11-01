import React from "react";
import Cabecalho from "../components/Cabeçalho";
import legging from "../assets/images/legging.png";
import academia1 from "../assets/images/academia 1.png";
import short from "../assets/images/short.png";
import jaqueta from "../assets/images/jaqueta 1.png";
import dumbbell from "../assets/images/esporte 1.png";
import camisa from "../assets/images/camisa.png";
import topbranco from "../assets/images/TOPBRANCO.png";
import sf from "../assets/images/SFbranco.png";
import b2 from "../assets/images/branca2.png";
import cvb from "../assets/images/cortaventobranco.png";
import paula from "../assets/images/paula.ng.png"
import lucas from "../assets/images/lucas.png"
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import banner from "../assets/images/logo_nova.png"


import "../styles/home.css";

export default function Home() {
  return (
    <div className="maincontainer">
      <Cabecalho />
      <div className="banner">
        <img src={banner} className="banner"/>
      </div>
      <main>
          <div className="categoriagrid">
            <div className="categorias">
              <img src={legging}  className="catimg"/>
            </div>
            <div className="categorias">
              <img src={camisa}  className="catimg"/>
            </div>
            <div className="categorias">
              <img src={academia1}  className="catimg"/>
            </div>
            <div className="categorias">
              <img src={short}  className="catimg"/>
            </div>
            <div className="categorias">
              <img src={jaqueta}  className="catimg"/>
            </div>
            <div className="categorias">
              <img src={dumbbell}  className="catimg"/>
            </div>
          </div>
          <div className="losfavoritos">
            <h1>OS FAVORITOS</h1>
            <div className="favgrid">
              <div><img src={topbranco} className="populares"/></div>
              <div><img src={sf} className="populares"/></div>
              <div><img src={b2} className="populares"/></div>
              <div><img src={cvb} className="populares"/></div>
            </div>
          </div>
          <div className="about">
            <div className="aboutus">
              <h1>SOBRE NÓS</h1>
              <p>Bem-vindo à nossa loja de roupas de academia, onde estilo e performance se encontram! Nossa missão é oferecer roupas que não apenas elevam seu desempenho durante os treinos, mas também refletem sua personalidade única. Com uma seleção de peças feitas com tecidos de alta qualidade e tecnologia inovadora, garantimos conforto e liberdade de movimento em cada atividade.</p>
              < p>Acreditamos que o exercício é uma forma de expressão, e queremos que você se sinta confiante e motivado em cada passo. Seja você um atleta experiente ou alguém que está começando a jornada fitness, estamos aqui para te apoiar. Junte-se a nós e descubra como podemos transformar sua experiência na academia com estilo e atitude!</p>
            </div>
          </div>
          <div className="OpnioesGrid">
            <div className="opniao">
              <div className="foto">
                  <img src={paula} className="foto1"/>
              </div>
              <h3>Paula, 23 anos.</h3>
              <p>"Descobri a loja por acaso e, desde a primeira compra, me apaixonei! As leggings são super confortáveis e não deslizam durante o treino. Além disso, o design é lindo! Me sinto mais confiante na academia e sempre recebo elogios. Recomendo a todos!"</p>
            </div>
            <div className="opniao">
              <div className="foto">
                  <img src={lucas} className="foto1"/>
              </div>
              <h3>Lucas, 32 anos.</h3>
              <p>"Como alguém que treina intensamente, sempre busco roupas que aguentem o tranco. As camisetas da loja são incríveis! O tecido respira bem e seca rapidinho. Além disso, o atendimento foi excelente e me ajudaram a escolher o tamanho perfeito. Com certeza voltarei!"</p>
            </div>
            <div className="opniao">
              <div className="foto">
                  <img src={paula} className="foto1"/>
              </div>
              <h3>Sofia, 25 anos</h3>
              <p>"Estou amando minhas novas roupas de treino! Comprei um conjunto e, desde então, não quero usar outra coisa. As cores são vibrantes e as peças se ajustam super bem ao corpo. É ótimo ver uma loja que entende a importância de se sentir bem enquanto se exercita!"</p>
            </div>
          </div>
      </main>
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

    </div>
  );
}

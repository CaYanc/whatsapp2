import React, { useContext } from "react";

// style
import "./styles/login.scss";

// imports
import { Link } from "react-router-dom";
import { UserContext } from "./context/Provider";

// img
import logo from './assets/logo.png'


const Singup = () => {
  const {
    registrarUser,
    email,
    setEmail,
    password,
    setPassword,
    nombre,
    setNombre,
  } = useContext(UserContext);

  return (
    <div className="singup login">
      <div className="logo_cont">
        <figure>
          <img src={logo} alt="" />
        </figure>
        <p>WHATSAPP WEB</p>
      </div>
      <div className="cart_cont ">
        <div className="whawind_cont">
          <p>
            Descargar WhatsApp Para Windows
            <br />
            <span>
              Haz llamadas, comparte pantalla y disfruta de una experiencia mas
              rapida con la nueva aplicaion
            </span>
          </p>
          <button>Obtener la aplicacion</button>
        </div>
        <div className="usa_cont">
          <div className="indica_cont">
            <p>
              Usa WhatsApp en tu computadora
              <br />
              <br />
            </p>

            <ul>
              <li>1.Abre WhatsApp en tu telefono.</li>
              <li>2.Toca Menu o Ajustes.</li>
              <li>
                3.Toca Dispositivos Vinculados y, luego, Vincular Dispositivo.
              </li>
              <li>
                4.Apunta tu telefonohacia esta pantalla y escanea este codigo.
              </li>
            </ul>
          </div>
          <div className="form_cont">
            <form className="form_form" action="">
              <input
                className="form_input"
                type="text"
                placeholder="Name"
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                className="form_input"
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="form_input"
                type="text"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="form_btn"
                onClick={() => {
                  registrarUser(email, password);
                }}
              >
                SingUp
              </div>
              <p className="text-[12px]">Ya tienes cuenta? <Link to={'/'} className="font-bold">Inicia sesion</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
    // <div className="singup">
    //   <div className="form_cont">
    //     <form className="form_form" action="">
    //       <input className="form_input" type="text" placeholder="Name" onChange={(e)=>setNombre(e.target.value)} />
    //       <input className="form_input" type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
    //       <input className="form_input" type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
    //       <div className="form_btn" onClick={()=>{registrarUser(email,password)}}>sumar</div>
    //       <p>ya tienes cuenta <Link to={'/'}>Login</Link></p>
    //     </form>
    //   </div>
    // </div>
  );
};

export default Singup;

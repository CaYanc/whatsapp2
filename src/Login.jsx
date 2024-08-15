import React, { useContext } from "react";

// style
import "./styles/login.scss";

// rutes
import { Link } from "react-router-dom";
import { UserContext } from "./context/Provider";

// img
import logo from "./assets/logo.png";

const Login = () => {
  const { email, setEmail, password, setPassword, inicionSesion } =
    useContext(UserContext);

  return (
    <div className="login">
      <div className="logo_cont">
        <figure>
          <img src={logo} alt="" />
        </figure>
        <p>WHATSAPP WEB</p>
      </div>
      <div className="cart_cont">
        <div className="whawind_cont ">
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
                4.Apunta tu telefono hacia esta pantalla y escanea este codigo.
              </li>
            </ul>
          </div>
          <div className="form_cont">
            <form className="form_form" action="">
              <div className="form_input_cont">
                <input
                  className="form_input"
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <label>Email</label> */}
              </div>
              <div className="form_input_cont">
              <input
                className="form_input"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              </div>
              <div
                className="form_btn"
                onClick={() => {
                  inicionSesion(email, password);
                }}
              >
                Login
              </div>
              <p className="text-[12px]">
                No tienes cuenta?{" "}
                <Link to={"/singup"} className="font-bold">
                  {" "}
                  resgistrate
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

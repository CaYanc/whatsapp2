import React, { useContext } from "react";

// style
import "./styles/principal.scss";
import Chats from "./Chats";
import Message from "./Message";
import { UserContext } from "./context/Provider";

// img
import compupc from '../src/assets/compupc.png';
import { PiLockKeyFill } from "react-icons/pi";

const Principal = () => {

  const {regresar}= useContext(UserContext)

  return (
    <div className="principal overflow-hidden">
      <div className="chats_cont">
        <Chats />
      </div>

      <div className={`message_cont  bg-[#eee] ${regresar ? 'right-[-100%]' : ''}`}>
        {/* <Message/> */}
        <div className="z-[10] detras_message_cont pb-[30px] w-[100%] h-[100%] flex items-center justify-center gap-3 flex-col text-[#555] font-light">
            <figure className="w-[35%]">
              <img src={compupc} alt="" className="w-[100%]"/>
            </figure>
            <h2 className="text-[25px] ">Descarga WhatsApp para Windows</h2>
            <p className="text-[13px] text-center">Descarga la aplicacion de Window y haz llmadas,comparte pantalla y disfruta de una <br /> experiencia mas rapida.</p>
            <button className="text-white text-[13px] font-medium py-2 px-8 rounded-full bg-[#008069]">Descargar de Microsoft Store</button>
            <br />
            <br />
            <p className="text-[10px] text-[#999] flex gap-1 items-center"><PiLockKeyFill /> Tus mensajes personales estan cifrados de extremo a extremo.</p>
        </div>
      </div>
    </div>
  );
};

export default Principal;

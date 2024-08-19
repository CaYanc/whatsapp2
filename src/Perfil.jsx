import React, { useContext, useEffect, useState } from "react";

// style

import "./styles/perfil.scss";
import "./styles/animaciones.scss";

import { RiArrowLeftLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";
import { MdOutlineCameraAlt } from "react-icons/md";
import { UserContext } from "./context/Provider";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { onAuthStateChanged } from "firebase/auth/cordova";
import { auth } from "./firebase";
import { TbSunHigh } from "react-icons/tb";

const Perfil = () => {
  const { perfil, setPerfil,cambiarTema, tema,setTema,setAbrirTema,abrirTema,funtAbrirTema } = useContext(UserContext);

 
  const [usuarioRegistrado, setUsuarioRegistrado] = useState([]);
  const [activo, setActivo] = useState(null);
  const [activoNombre, setActivoNombre] = useState(null);

  const db = getFirestore();

  const mostrarUsuario = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "usuario"));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
        setUsuarioRegistrado(docs);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const usuarioActivo = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setActivo(uid);
      } else {
      }
    });
  };

  usuarioActivo();

  mostrarUsuario();

  useEffect(()=>{
    if(tema == "dark"){
      document.querySelector('html').classList.add('dark')
    }else{
      document.querySelector('html').classList.remove('dark')
    }
  }
  ,[tema])

  return (
    <div className="perfil dark:bg-[#0F1C24]">
      <div className="flex gap-2 items-center font-semibold self-start border-b w-[100%] py-2  dark:text-white">
        <RiArrowLeftLine
          onClick={() => {
            setPerfil(false);
          }}
        />
        Perfil
      </div>
      <div className="foto_perfil relative">
        <figure className="w-[180px] h-[180px] rounded-full">
          <img src="" alt="" />
        </figure>
        <span className="edit_foto absolute bottom-3 right-2 bg-[#15cc05] text-[23px] text-white w-[40px] h-[40px] rounded-full flex items-center justify-center">
          <MdOutlineCameraAlt />
        </span>
      </div>
      <div className="flex justify-center gap-2 items-start">
        <FaRegUser className="text-[12px] text-[#555]" />
        <div className="text-[#555] w-[70%] border-b">
          <span className="text-[11px]">Nombre</span>
          <br />
          <span className="text-[14px] text-black font-semibold  dark:text-white">
            {usuarioRegistrado.map((usuReg) =>
              usuReg.iduser == activo ? <div>{usuReg.nombre}</div> : ""
            )}
          </span>
          <p className="text-[9px] border-b">
            Este no es tu nombre de usuario ni un PIN. Este nombre sera visible
            para tus contactos de WhatsApp.
          </p>

          <br />

          <div className="tema_cont" onClick={()=>{funtAbrirTema()}}>
            <p className="text-[14px] text-black dark:text-white">Tema</p>

            <span className="text-[10px]">{tema == "dark" ? "Oscuro" : "Claro"}</span> <br />

            <span className= {`cambiador_cont flex items-center justify-center ${abrirTema ? "left-0" : ""}`}>
              <button  onClick={()=>{cambiarTema(),funtAbrirTema()}} className="dark:bg-[#0F1C24] px-[20px] py-[5px] rounded-md text-white">Cambiar a <br />{tema == "dark" ? "Claro" : "Oscuro"}</button>
            </span>
          </div>
         </div>
        <BiPencil className="text-[14px] text-[#15cc05]" />
      </div>

    </div>
  );
};

export default Perfil;

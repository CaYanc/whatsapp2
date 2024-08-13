import React, { useContext, useState } from "react";

// style

import "./styles/perfil.scss";
import { RiArrowLeftLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";
import { MdOutlineCameraAlt } from "react-icons/md";
import { UserContext } from "./context/Provider";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { onAuthStateChanged } from "firebase/auth/cordova";
import { auth } from "./firebase";

const Perfil = () => {
  const { perfil, setPerfil } = useContext(UserContext);

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

  return (
    <div className="perfil ">
      <div className="flex gap-2 items-center font-semibold self-start border-b w-[100%] py-2">
        <RiArrowLeftLine
          onClick={() => {
            setPerfil(false);
          }}
        />
        Perfil
      </div>
      <div className="foto_perfil relative">
        <figure className="w-[180px] h-[180px] rounded-full bg-black ">
          <img src="" alt="" />
        </figure>
        <span className="edit_foto absolute bottom-3 right-2 bg-[#15cc05] text-[23px] text-white w-[40px] h-[40px] rounded-full flex items-center justify-center">
          <MdOutlineCameraAlt />
        </span>
      </div>
      <div className="flex justify-center gap-2 items-center">
        <FaRegUser className="text-[12px] text-[#555]" />
        <div className="text-[#555] w-[70%] border-b">
          <span className="text-[11px]">Nombre</span>
          <br />
          <span className="text-[14px] text-black font-semibold">
            {usuarioRegistrado.map((usuReg) =>
              usuReg.iduser == activo ? <div>{usuReg.nombre}</div> : ""
            )}
          </span>
          <p className="text-[9px]">
            Este no es tu nombre de usuario ni un PIN. Este nombre sera visible
            para tus contactos de WhatsApp.
          </p>
        </div>
        <BiPencil className="text-[14px] text-[#15cc05]" />
      </div>
    </div>
  );
};

export default Perfil;

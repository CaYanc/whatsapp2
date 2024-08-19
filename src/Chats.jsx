import React, { useContext, useEffect, useState } from "react";

// style
import "./styles/principal.scss";

// import
import { BsFillChatSquareTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { UserContext } from "./context/Provider";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { onAuthStateChanged } from "firebase/auth/cordova";
import { auth } from "./firebase";
import Message from "./Message";
import { BiSolidMessageDetail } from "react-icons/bi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { MdOutlineCall, MdOutlinePeopleAlt } from "react-icons/md";
import { IoIosArrowDown, IoMdSearch } from "react-icons/io";
import { FaAnchor } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import Perfil from "./Perfil";

const Chats = () => {
  const { cerrarSesion, setRegresar,perfil,setPerfil } = useContext(UserContext);
  const { filtrofiltro, setFiltrofiltro } = useState();

  const [showThree, setShowThree] = useState(false);
  const [activo, setActivo] = useState(null);
  const [activoNombre, setActivoNombre] = useState(null);
  const [usuarioRegistrado, setUsuarioRegistrado] = useState([]);
  const [usuarioRegistradoAtivo, setUsuarioRegistradoActivo] = useState([]);
  const [abrirUsuario, setAbrirUsuario] = useState(false);
  const [abrirUsuarioNombre, setAbrirUsuarioNombre] = useState(null);
  const [abrirUsuarioId, setAbrirUsuarioId] = useState(null);

  const db = getFirestore();

  // click para funcion de tres puntos

  const clickShowThree = () => {
    setShowThree(!showThree);
  };

  //llamar funciones con useEffect

  useEffect(() => {
    mostrarUsuario();
    usuarioActivo();
  }, []);

  // mostar usuarios

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

  // usuario activo

  const usuarioActivo = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const nombre = user.email;
        setActivo(uid);
        setActivoNombre(nombre)
      } else {
      }
    });
  };

  return (
    <div className="chats dark:bg-[#0F1C24] ">
        {perfil && <Perfil />}
      <div className="menu_cont relative flex justify-between dark:bg-[#0F1C24] dark:text-white">
        <div className="menu_activo_cont flex gap-3 items-center dark:text-white">
          <figure onClick={()=>{setPerfil(true)}} className="w-[30px] h-[30px] rounded-full bg-black">
            <img src="" alt="" />
            <span className="dark:text-black">
              {usuarioRegistrado.map((usuReg) =>
                usuReg.iduser == activo ? <div>{usuReg.nombre}</div> : ""
              )}
            </span>
          </figure>
          <b className="text-[15px]">Chats</b>
        </div>
        <article className="menu_icon_chat flex gap-3 justify-between items-center">
          <div className="menu_btn_cont ">
            <BiSolidMessageDetail />
            <span>Chats</span>
          </div>
          <div className="menu_btn_cont ">
            <HiOutlineStatusOnline />
            <span>Estados</span>
          </div>
          <div className="menu_btn_cont ">
            <MdOutlinePeopleAlt />
            <span>Grupos</span>
          </div>
          <div
            onClick={clickShowThree}
            className="menu_btn_cont transition-all"
          >
            <BsThreeDotsVertical />
            <span>Ajustes</span>
          </div>
        </article>
        {showThree ? (
          <div
            onClick={() => {
              cerrarSesion();
            }}
            className=" dark:bg-[#1C2D35] bg-[white] p-1 px-2 shadow-md shadow-slate-400 absolute z-50 transition-all top-[90%] right-0 "
          >
            Cerrar sesion <br />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="filtros_cont dark:text-white">
        <div className="filtro_input relative">
          <span className="absolute left-2 text-[#555] ">
            <IoMdSearch />
          </span>
          <input type="text" placeholder="Buscar" className="outline-none dark:bg-[#1C2D35] "  />
        </div>
        <div className="filtro_filtro ">
          <input
            className="filtro_filtro_input  "
            type="text"
            value="Todos"
            readOnly
            autoFocus

          />
          <input
            type="text"
            value="No Leidos"
            readOnly
            className="filtro_filtro_input"
          />
          <input
            type="text"
            value="Grupos"
            readOnly
            className="filtro_filtro_input "
          />
        </div>
      </div>
      <div className="usuarios_cont w-[100%] ">
        <div className="usuario "></div>
        {usuarioRegistrado.map((usuReg) =>
          usuReg.iduser !== activo ? (
            <div
              key={usuReg.iduser}
              className="usuario dark:text-white"
              onClick={() => {
                setAbrirUsuario(true),
                  setAbrirUsuarioNombre(usuReg.nombre),
                  setAbrirUsuarioId(usuReg.iduser);
                  setRegresar(false);
              }}
            >
              <figure className="w-[40px] h-[40px] rounded-full ">
                <img src="" alt="" />
              </figure>
              <article className=" w-[70%]">
                <span>{usuReg.nombre}</span>
                <p>mensaje</p>
              </article>
              <div>
                <p>Ayer</p>
                <span>
                  <TiPin />
                  <IoIosArrowDown />
                </span>
              </div>
            </div>
          ) : (
            ""
          )
        )}

        {abrirUsuario && (
          <Message
            nombre={abrirUsuarioNombre}
            idUsuario={abrirUsuarioId}
          ></Message>
        )}
      </div>
      <div className="menu_bottonm">
          <article>
          <BsFillChatSquareTextFill />
            <span>Chats</span>
          </article>
          <article>
            <HiOutlineStatusOnline />
            <span>Novedades</span>
          </article>
          <article>
          <MdOutlinePeopleAlt />
            <span>Comunidades</span>
          </article>
          <article>
          <MdOutlineCall />
            <span>Llamadas</span>
          </article>
      </div>
    </div>
  );
};

export default Chats;

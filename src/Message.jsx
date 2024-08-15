import React, { useContext, useEffect, useState } from "react";

// style
import "./styles/principal.scss";

// imports
import { UserContext } from "./context/Provider";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  Query,
  query,
} from "firebase/firestore/lite";
import { onAuthStateChanged } from "firebase/auth/cordova";
import { auth } from "./firebase";
import { onSnapshot } from "firebase/firestore";
import {
  BsCheckAll,
  BsChevronLeft,
  BsEmojiGrin,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { IoIosArrowDown, IoMdSearch } from "react-icons/io";
import { IoSendSharp, IoVideocam } from "react-icons/io5";
import { HiMicrophone } from "react-icons/hi";
import { GoPlus } from "react-icons/go";
import { RiArrowLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Chats from "./Chats";

const Message = ({ nombre, idUsuario }) => {
  const { setRegresar, funRegresar, regresar } = useContext(UserContext);

  const db = getFirestore();

  // guardar mensages
  const [activo, setActivo] = useState(null);
  const [messageGuardado, setMessageGuardado] = useState("");

  const guardarMessage = async (e) => {
    e.preventDefault();

    console.log(activo);
    try {
      await addDoc(collection(db, "messages"), {
        text: messageGuardado,
        userid: activo,
        recibe: idUsuario,
        fecha: Date.now(),
        hora: new Date().getHours(),
        minutos: new Date().getMinutes(),
      });
    } catch (error) {}

    usuarioActivo();

    setMessageGuardado("");
  };

  // mostrar mensajes
  const [liMessage, setLiMessage] = useState([]);

  // usuario activo

  const usuarioActivo = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setActivo(uid);
      } else {
      }
    });
  };

  // mostrar emnsaje
  useEffect(() => {
    const mostrarMessage = async () => {
      try {
        const collRef = collection(db, "messages");
        const eventQuery = query(collRef, orderBy("fecha"));
        const querySnapchot = await getDocs(eventQuery);
        const docs = [];
        querySnapchot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLiMessage(docs);
      } catch (error) {}
    };

    usuarioActivo();
    mostrarMessage();
  }, [liMessage]);

  return (
    // <div className="message absolute z-[200] top-0 right-0">
    <div
      className={`message absolute z-[200] top-0 right-0 bg-[#eee] ${
        regresar ? "right-[-100%]" : ""
      }`}
    >
      <div className="menu_cont_messages bg-slate-400 ">
        <div className="usuario_message">
          <div
            className="icon_regresar"
            onClick={() => {
              funRegresar();
            }}
          >
            <RiArrowLeftLine className="text-[20px]" />
          </div>
          <figure className="w-[35px] h-[35px] rounded-full ">
            <img src="" alt="" />
          </figure>
          <p>{nombre}</p>
        </div>

        <div className="icon_message">
          <span className="flex items-center py-3.5 px-3 rounded-full gap-1 border">
            <IoVideocam className="text-[#aaa]" />
            <IoIosArrowDown className="text-[#aaa] text-[7px]" />{" "}
          </span>
          <span className="flex items-center ">
            <IoMdSearch />
          </span>
          <span className="flex items-center">
            <BsThreeDotsVertical />{" "}
          </span>
        </div>
      </div>

      <div className="messages_usua_cont  overflow-y-scroll">
        <div className="p-1 flex flex-col px-[40px]">
          {liMessage.map((mess) =>
            mess.userid == idUsuario || mess.userid == activo ? (
              mess.userid !== activo ? (
                mess.recibe == activo ? (
                  <div
                    key={mess.text}
                    className="w-fit py-1 flex px-2 bg-white my-1 rounded-md gap-2 text-[13px]"
                  >
                    {mess.text}
                    <br />
                    {/* {mess.userid},<br /> */}
                    {/* {idUsuario} */}
                    <span className="text-[9px] text-[#aaa] self-end">
                      {/* 5:12 p.m. */}
                      {mess.hora}:{mess.minutos}
                    </span>
                  </div>
                ) : (
                  ""
                )
              ) : idUsuario == mess.recibe ? (
                <div className="w-fit py-1 px-2 bg-[#D9FDD3] my-1 relative self-end flex gap-2 rounded-md text-[13px]">
                  {mess.text}
                  <br />
                  {/* {idUsuario} */}
                  <span className="text-[9px] text-[#aaa] self-end flex gap-1">
                    {mess.hora}:{mess.minutos}
                    <BsCheckAll className="self-end text-[13px]" />
                  </span>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )
          )}
        </div>
      </div>
      <form onSubmit={guardarMessage} className="form_message">
        <div className="form_icons flex gap-2 items-center">
          <BsEmojiGrin />
          <GoPlus className="text-[30px]" />
        </div>
        <input
          className="input_message"
          value={messageGuardado}
          type="text"
          placeholder="Escribe un mensaje"
          onChange={(e) => {
            setMessageGuardado(e.target.value);
          }}
        />
        <input className="submit_message" type="submit" value="⪢" />
        <div className="form_icons microfono">
          <HiMicrophone />
        </div>
      </form>
    </div>
  );
};

export default Message;

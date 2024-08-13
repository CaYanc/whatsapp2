import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth/cordova";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { Await, useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";
// import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

const Provider = ({ children }) => {
  // useStates
  const [perfil, setPerfil] = useState(false)
  const [messageGuardado, setMessageGuardado] = useState("");

  // resgistrar usuario

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [idUsuario, setIdUsuario] = useState("null");

  const navigate = useNavigate();
  const db = getFirestore();

  const registrarUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // setIdUsuario(user.uid)
        navigate("/");

        // registrar usuario en database

        try {
          await addDoc(collection(db, "usuario"), {
            nombre: nombre,
            iduser: user.uid,
          });
        } catch (error) {}
      })
      .catch((error) => {
        alert("Modifique sus credenciales");
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  // inicio de sesion

  const inicionSesion = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIdUsuario(user.id);
        navigate("/principal");
      })
      .catch((error) => {
        alert("Usuario invalido");
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  // cerrar sesion

  const cerrarSesion = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert("vuelve a intentarlo");
      });
  };

  // guardar mensaje en firedatabse

  const [activo, setActivo] = useState(null);
  const usuarioActivo = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setActivo(uid);
      } else {
      }
    });
  };

  const guardarMessage = async (e) => {
    e.preventDefault();

      // console.log(activo);
      try {
        await addDoc(collection(db, "messages"), {
          text: messageGuardado,
          userid: activo,
          fecha: new Date()
        });
      } catch (error) {}

    usuarioActivo();

    setMessageGuardado("");
  };

  const [regresar, setRegresar] = useState(true)

  // funcion regresar

  const funRegresar = ()=>{
    setRegresar(true)
    console.log(regresar)
  }

  return (
    <UserContext.Provider
      value={{
        perfil,
        setPerfil,
        regresar,
        setRegresar,
        funRegresar,
        setMessageGuardado,
        messageGuardado,
        guardarMessage,
        cerrarSesion,
        inicionSesion,
        registrarUser,
        email,
        setEmail,
        password,
        setPassword,
        nombre,
        setNombre,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Provider;

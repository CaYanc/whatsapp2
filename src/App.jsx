// rutas
import { BrowserRouter, Route, Routes } from "react-router-dom";

// style
import "./styles/app.scss";

// rutes
import Login from "./Login";
import Singup from "./Singup";
import Principal from "./Principal";
import Chats from "./Chats";
import Message from "./Message";
import Provider from "./context/Provider";

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/singup" element={<Singup />} />
          <Route path="/principal" element={<Principal />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/message" element={<Message />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

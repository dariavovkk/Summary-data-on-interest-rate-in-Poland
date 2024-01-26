import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import React, { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Info from "./components/Main/Info";
import Dane from "./components/Main/Dane";
import Mapa from "./components/Main/Mapa";

function App() {
  const user = localStorage.getItem("token");
  const [dane, setDane] = useState(() => {
    const storedData = localStorage.getItem("dane");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [message, setMessage] = useState(() => {
    const storedMessage = localStorage.getItem("message");
    return storedMessage ? storedMessage : "";
  });

  const handleSetDane = (data) => {
    setDane(data);
    localStorage.setItem("dane", JSON.stringify(data));
  }
  const handleSetMessage = (message) => {
    setMessage(message);
    localStorage.setItem("message", JSON.stringify(message));
  }
  return (
    <Routes>
      {user &&
        <Route
          path="/"
          element={<Main setDane={handleSetDane} setMessage={handleSetMessage} />}
        />
      }
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      {user && <Route
        path="/info"
        element={
          <div>
            <Main setDane={handleSetDane} setMessage={handleSetMessage} />
            <Info user={dane} message={message} />
          </div>
        }
      />
      }
      {user && <Route
        path="/dane"
        element={
          <div>
            <Main setDane={handleSetDane} />
            <Dane data={dane} />
          </div>
        }
      />
      }
      {user && <Route
        path="/mapa"
        element={
          <div>
            <Main setDane={handleSetDane} />
            <Mapa />
          </div>
        }
      />
      }
      <Route path="/mapa" element={<Mapa />} /> 
      <Route path="/info" element={<Navigate replace to="/login" />} />
      <Route path="/dane" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;


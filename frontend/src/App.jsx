
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Track from "./pages/Track";
import Book from "./pages/Book";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Driver from "./components/Driver";
import Protected from "./components/Protected";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/track" element={<Protected><Track /></Protected>} />
        <Route path="/book" element={<Protected><Book /></Protected>} />
        <Route path="/notifications" element={<Protected><Notifications /></Protected>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={ <Register />} />
        <Route path="/driver" element={<Protected><Driver /></Protected>} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
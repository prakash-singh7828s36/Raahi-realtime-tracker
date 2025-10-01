
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Track from "./pages/Track";
import Book from "./pages/Book";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Driver from "./components/Driver";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/track" element={<Track />} />
        <Route path="/book" element={<Book />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/driver" element={<Driver />} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
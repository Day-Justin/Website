import React from "react";
import { createRoot } from "react-dom/client";
import Homepage from "./Homepage";
import Roomjoinpage from "./Roomjoinpage";
import Createroompage from "./Createroompage";
import Rooms from "./Rooms";
import  { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";

// don't 4get 2 add routes to django url

export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Homepage />} />
                <Route path='/join' element={<Roomjoinpage />} />
                <Route path='/create' element={<Createroompage />} />
                <Route path='/rooms/:roomCode' element={<Rooms />} />
            </Routes>
        </Router>);
}

const root = createRoot(document.getElementById("app"));

root.render(<App />);

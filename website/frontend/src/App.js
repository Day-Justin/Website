import React, { Component }from "react";
import Musichome from "./musicComponents/Musichome";
import Roomjoinpage from "./musicComponents/Roomjoinpage";
import Createroompage from "./musicComponents/Createroompage";
import Homepage from "./About/Homepage";
import Navbar from "./Navbar";
import Errorpage from "./Errorpage";
import Rooms from "./musicComponents/Rooms";
import Sessionroute from "./musicComponents/Sessionroute";
import Footer from "./Footer";
import  { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// don't 4get 2 add routes to django url

function App(){
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path='/' element={<Homepage />} />
                    <Route exact path='music/' element={<Sessionroute />}>
                        <Route exact path='music/' element={<Musichome />} />
                    </Route>
                    <Route path='music/join' element={<Roomjoinpage />} />
                    <Route path='music/create' element={<Createroompage />} />
                    <Route path='music/rooms/:roomCode' element={<Rooms />} />   
                    <Route path='*' element={<Errorpage />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;

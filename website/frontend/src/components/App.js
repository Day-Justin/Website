import React, { Component }from "react";
import Homepage from "./Homepage";
import Roomjoinpage from "./Roomjoinpage";
import Createroompage from "./Createroompage";
import { Navbar } from "./Navbar";
import Errorpage from "./Errorpage";
import Rooms from "./Rooms";
import Sessionroute from "./Sessionroute";
import  { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// don't 4get 2 add routes to django url

function App(){
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path='/' element={<Sessionroute />}>
                        <Route exact path='/' element={<Homepage />}/>
                    </Route>
                    <Route path='/join' element={<Roomjoinpage />} />
                    <Route path='/create' element={<Createroompage />} />
                    <Route path='/rooms/:roomCode' element={<Rooms />} />   
                    <Route path='*' element={<Errorpage />} />
                </Routes>
                <div> Footer </div>
            </Router>
        </div>
    );
}

export default App;

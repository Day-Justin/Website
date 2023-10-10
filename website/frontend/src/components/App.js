import React, { Component }from "react";
import Homepage from "./Homepage";
import Roomjoinpage from "./Roomjoinpage";
import Createroompage from "./Createroompage";
import Errorpage from "./Errorpage";
import Rooms from "./Rooms";
import Sessionroute from "./Sessionroute";
import  { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// don't 4get 2 add routes to django url

export default function App(){


        return (
            <div>
            <Router>
                <nav>
                    <Link to='/'> Home </Link>
                    <Link to='/join'>  Join </Link>
                    <Link to='/create'> Create </Link>
                </nav>
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
        );}

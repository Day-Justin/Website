import React from "react";
import Musichome from "./musicComponents/Musichome";
import Roomjoinpage from "./musicComponents/Roomjoinpage";
import Createroompage from "./musicComponents/Createroompage";
import Homepage from "./About/Homepage";
import Bill from "./billComponents/Bill";
import Navbar from "./Navbar";
import Errorpage from "./Errorpage";
import Rooms from "./musicComponents/Rooms";
import Sessionroute from "./musicComponents/Sessionroute";
import About from "./About/About";
import Resume from "./About/Resume";
import Footer from "./Footer";
import  { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider }from '@tanstack/react-query';

// don't 4get 2 add routes to django url

function App(){
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });

    return (
        <div className="app">
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Navbar />
                    <Routes className="main"> 
                        <Route exact path='/' element={<Homepage />} />
                        <Route exact path='about/' element={<About />} />
                        <Route exact path='resume/' element={<Resume />} />
                        <Route exact path='bill/' element={<Bill />} />
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
            </QueryClientProvider>
        </div>
    );
}

export default App;

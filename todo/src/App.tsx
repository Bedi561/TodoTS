/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import { Landing } from "./components/Landing.jsx";
// import axios from "axios";
// import { useEffect } from "react";
import {RecoilRoot} from 'recoil';
import TodoList from './components/TodoList.js';


// if(process.env.Node_ENV === 'production') disableReactDevTools();

function App() {
    return (
        <RecoilRoot>
            <div style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "#eeeeee"
            }}
            >
               <Router>
                    {/* <InitUser /> */}
                    <Routes>
                    <Route path={"/"} element={<Landing />} />
                        <Route path={"/signin"} element={<Signin />} />
                        <Route path={"/signup"} element={<Signup />} />
                        <Route path={"/list"} element={<TodoList />} />
                    </Routes>
                </Router>
            </div>
        </RecoilRoot>
    );
}



// function InitUser() {
//     const setUser = useSetRecoilState(userState);

//     const init = async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}/admin/me`, {
//                 headers: {
//                     "Authorization": "Bearer " + localStorage.getItem("token")
//                 }
//             });

//             if (response.data.username) {
//                 setUser({
//                     isLoading: false,
//                     userEmail: response.data.username
//                 });
//             } else {
//                 setUser({
//                     isLoading: false,
//                     userEmail: null
//                 });
//             }
//         } catch (e) {
//             setUser({
//                 isLoading: false,
//                 userEmail: null
//             });
//         } 
//     };

//     useEffect(() => {
//         // Check if the current route is /me before initializing the user
//             console.log("Initializing user...");
//             init();
        
//     }, []);

//     return <></>;
// }

export default App;

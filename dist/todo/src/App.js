"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from 'react';
const react_router_dom_1 = require("react-router-dom");
const Signin_jsx_1 = __importDefault(require("./components/Signin.jsx"));
const Signup_jsx_1 = __importDefault(require("./components/Signup.jsx"));
const Landing_jsx_1 = require("./components/Landing.jsx");
// import axios from "axios";
// import { useEffect } from "react";
const recoil_1 = require("recoil");
const TodoList_js_1 = __importDefault(require("./components/TodoList.js"));
// if(process.env.Node_ENV === 'production') disableReactDevTools();
function App() {
    return (<recoil_1.RecoilRoot>
            <div style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#eeeeee"
        }}>
               <react_router_dom_1.BrowserRouter>
                    {/* <InitUser /> */}
                    <react_router_dom_1.Routes>
                    <react_router_dom_1.Route path={"/"} element={<Landing_jsx_1.Landing />}/>
                        <react_router_dom_1.Route path={"/signin"} element={<Signin_jsx_1.default />}/>
                        <react_router_dom_1.Route path={"/signup"} element={<Signup_jsx_1.default />}/>
                        <react_router_dom_1.Route path={"/list"} element={<TodoList_js_1.default />}/>
                    </react_router_dom_1.Routes>
                </react_router_dom_1.BrowserRouter>
            </div>
        </recoil_1.RecoilRoot>);
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
exports.default = App;

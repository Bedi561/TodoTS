/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user.js";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { BASE_URL } from "../config.ts";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {

        try {
            const response = await axios.post(`${BASE_URL}/auth/signup`, {
                username: username,
                password: password
            });

            const data = response.data;
            localStorage.setItem("token", data.token);
            navigate('/list');
        } catch (error) {
            console.error("Error while signing up:", error);
            alert("Error while signing up");
        }
    };

    const setUser = useSetRecoilState(userState);

    return (
        <>
            <div>
                <div style={{
                    paddingTop: 150,
                    marginBottom: 10,
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Typography variant={"h6"} style={{ color: "black" }}>
                        Welcome to Coursera. Sign up below
                    </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Card variant={"outlined"} style={{ width: 400, padding: 20, textAlign: "center" }}>
                        <TextField
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                            fullWidth={true}
                            label="Email"
                            variant="outlined"
                        />
                        <br /><br />
                        <TextField
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            fullWidth={true}
                            label="Password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <br /><br />
                        {/* Signup Button */}
                        <Button
                            size={"large"}
                            variant="contained"
                            onClick={handleSignup}
                        >
                            Signup
                        </Button>
                        {/* Already a user? text and link to signin */}
                        <div style={{ marginTop: 10 }}>
                            <Typography variant="body2">
                                Already a user? <span style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate("/UserSignin")}>Sign in</span>
                            </Typography>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Signup;

import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user.js";
import { BASE_URL } from "../config.js";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// ... (previous imports)

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);

    return (
        <>
            
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{
                    paddingTop: 150,
                    marginBottom: 10,
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Typography variant={"h6"} style={{ color: "black" }}>
                        Welcome to Coursera. Sign in below
                    </Typography>
                </div>
                <Card variant={"outlined"} style={{ width: 400, padding: 20, textAlign: "center" }}>
                    <TextField
                        onChange={(event) => {
                            setEmail(event.target.value);
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
                    <Button
                        size={"large"}
                        variant="contained"
                        onClick={async () => {
                            const res = await axios.post(`${BASE_URL}/admin/signin`, {
                                username: email,
                                password: password
                            }, {
                                headers: {
                                    "Content-type": "application/json"
                                }
                            });
                            const data = res.data;

                            localStorage.setItem("token", data.token);
                            setUser({
                                userEmail: email,
                                isLoading: false
                            });
                            navigate("/list");
                        }}
                    >
                        Sign in
                    </Button>
                    {/* New user signup line */}
                    <div style={{ marginTop: 10 }}>
                        <Typography variant="body2">
                            New user? <span style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate("/list")}>Signup</span>
                        </Typography>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default Signin;

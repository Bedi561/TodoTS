"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Button_1 = __importDefault(require("@mui/material/Button"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const material_1 = require("@mui/material");
const axios_1 = __importDefault(require("axios"));
const recoil_1 = require("recoil");
const user_js_1 = require("../store/atoms/user.js");
const InputAdornment_1 = __importDefault(require("@mui/material/InputAdornment"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Visibility_1 = __importDefault(require("@mui/icons-material/Visibility"));
const VisibilityOff_1 = __importDefault(require("@mui/icons-material/VisibilityOff"));
const config_js_1 = require("../config.js");
const Signup = () => {
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)('');
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSignup = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(`${config_js_1.BASE_URL}/auth/signup`, {
                email: email,
                password: password
            });
            const data = response.data;
            localStorage.setItem("token", data.token);
            navigate('/list');
        }
        catch (error) {
            console.error("Error while signing up:", error);
            alert("Error while signing up");
        }
    });
    const setUser = (0, recoil_1.useSetRecoilState)(user_js_1.userState);
    return (<>
            <div>
                <div style={{
            paddingTop: 150,
            marginBottom: 10,
            display: "flex",
            justifyContent: "center"
        }}>
                    <material_1.Typography variant={"h6"} style={{ color: "black" }}>
                        Welcome to Coursera. Sign up below
                    </material_1.Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <material_1.Card variant={"outlined"} style={{ width: 400, padding: 20, textAlign: "center" }}>
                        <TextField_1.default onChange={(event) => {
            setEmail(event.target.value);
        }} fullWidth={true} label="Email" variant="outlined"/>
                        <br /><br />
                        <TextField_1.default onChange={(e) => {
            setPassword(e.target.value);
        }} fullWidth={true} label="Password" variant="outlined" type={showPassword ? "text" : "password"} InputProps={{
            endAdornment: (<InputAdornment_1.default position="end">
                                        <IconButton_1.default onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <Visibility_1.default /> : <VisibilityOff_1.default />}
                                        </IconButton_1.default>
                                    </InputAdornment_1.default>),
        }}/>
                        <br /><br />
                        {/* Signup Button */}
                        <Button_1.default size={"large"} variant="contained" onClick={handleSignup}>
                            Signup
                        </Button_1.default>
                        {/* Already a user? text and link to signin */}
                        <div style={{ marginTop: 10 }}>
                            <material_1.Typography variant="body2">
                                Already a user? <span style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate("/UserSignin")}>Sign in</span>
                            </material_1.Typography>
                        </div>
                    </material_1.Card>
                </div>
            </div>
        </>);
};
exports.default = Signup;

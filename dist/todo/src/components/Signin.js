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
const Button_1 = __importDefault(require("@mui/material/Button"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const material_1 = require("@mui/material");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
const recoil_1 = require("recoil");
const user_js_1 = require("../store/atoms/user.js");
const config_js_1 = require("../config.js");
const InputAdornment_1 = __importDefault(require("@mui/material/InputAdornment"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Visibility_1 = __importDefault(require("@mui/icons-material/Visibility"));
const VisibilityOff_1 = __importDefault(require("@mui/icons-material/VisibilityOff"));
// ... (previous imports)
function Signin() {
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const setUser = (0, recoil_1.useSetRecoilState)(user_js_1.userState);
    return (<>
            
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{
            paddingTop: 150,
            marginBottom: 10,
            display: "flex",
            justifyContent: "center"
        }}>
                    <material_1.Typography variant={"h6"} style={{ color: "black" }}>
                        Welcome to Coursera. Sign in below
                    </material_1.Typography>
                </div>
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
                    <Button_1.default size={"large"} variant="contained" onClick={() => __awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default.post(`${config_js_1.BASE_URL}/admin/signin`, {
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
        })}>
                        Sign in
                    </Button_1.default>
                    {/* New user signup line */}
                    <div style={{ marginTop: 10 }}>
                        <material_1.Typography variant="body2">
                            New user? <span style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate("/list")}>Signup</span>
                        </material_1.Typography>
                    </div>
                </material_1.Card>
            </div>
        </>);
}
exports.default = Signin;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Landing = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const Box_1 = __importDefault(require("@mui/material/Box"));
const styles_1 = require("@mui/material/styles");
const Button_1 = __importDefault(require("@mui/material/Button"));
const Stack_1 = __importDefault(require("@mui/material/Stack"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const react_router_dom_1 = require("react-router-dom");
const FirstPageAppbar = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<Box_1.default sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            padding: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}>
      <Typography_1.default variant="h4" color="primary">
        TODO-LIST
      </Typography_1.default>
    </Box_1.default>);
};
const Landing = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<>
      <FirstPageAppbar />
      <Box_1.default sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            margin: 'auto',
            padding: '20px',
        }}>
        <Stack_1.default spacing={2} direction="row">
        <CustomButton onClick={() => navigate('/signup')} variant="contained">
            SIGNUP
          </CustomButton>
          <CustomButton onClick={() => navigate('/signin')} variant="contained">
            SIGNIN
          </CustomButton>
        </Stack_1.default>
      </Box_1.default>
    </>);
};
exports.Landing = Landing;
const CustomButton = (0, styles_1.styled)(Button_1.default)(({ theme }) => ({
    width: '300px',
    height: '200px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
        border: `4px solid ${theme.palette.primary.main}`,
        boxShadow: `0 0 20px ${theme.palette.primary.main}`,
    },
}));

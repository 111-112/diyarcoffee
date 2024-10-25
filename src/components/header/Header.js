import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import coffeeLogo from "../../assets/images/logo/logo.png";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import configureStore from "../../redux/store/configureStore";
import { Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setStatus } from "../../redux/slices/statusSlice";
import ListAltIcon from "@mui/icons-material/ListAlt";

const pages = ["ورود", "ثبت نام", "پزشکان"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const useStyles = makeStyles((theme) => ({
  root: {
    direction: "rtl",
    backgroundColor: "#ffffff",
    margin: "auto",
    textAlign: "center",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    /* padding: "1%",
    direction: "rtl",*/
    backgroundColor: "#ffffff",
  },
  boxButton: {
    position: "relative",
    right: "5%",
  },
  button: {
    width: "30%",
    fontSize: "17px",
    [theme.breakpoints.down("sm")]: {
      width: "64%",
      fontSize: "12px",
    },
  },
  buttonTable:{
    backgroundColor:"#a27356",
    color:"white"
  }
}));

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [table, setTable] = React.useState("");
  const dispatch = useDispatch();

  const store = configureStore();
  const status = useSelector((state) => state.entities.status.value);

  const classes = useStyles();

  useEffect(() => {
    console.log("status",status);
    dispatch(setStatus({ status: table }));
    setTimeout(() => {
      console.log("status", status, "table", table);
    }, 1000);
  }, [dispatch]);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const tableButton = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleTableSelection = (value) => {
    setTable(value);
    dispatch(setStatus({ status: value }));
    handleClose();
  };
  const d = () => {
    console.log("status", status, "table", table);
  };

  const handleLogout = () => {
    //store.dispatch(USER_LOGOUT());
    localStorage.removeItem("iconAccount");
    window.location.reload();
    console.log(store.getState().entities.users);
  };

  return (
    <AppBar
      className={classes.root}
      style={{ backgroundColor: "#ffffff" }}
      position="relative"
    >
      <Container className={classes.container} maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            alt="logo"
            src={coffeeLogo}
          />
          <Typography
            variant="h5"
            noWrap
            component="p"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "inherit",
              fontWeight: 800,
              my: 1,

              color: "#a27356",
              textDecoration: "none",
              position: "relative",
              right: "1%",
            }}
          >
            کافی شاپ دیار
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="info"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem href="/">
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontFamily: "inherit",
                    fontSize: "17px",
                    right: "2%",
                    color: "#a27356",
                  }}
                  sx={{ textAlign: "right" }}
                >
                  سفارش ها
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="p"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "inherit",
              fontWeight: 700,
              width: "-webkit-fill-available",
              color: "#a27356",
              textDecoration: "none",
            }}
          >
            کافی شاپ دیار
          </Typography>
          <Box
            className={classes.boxButton}
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            <Button
              href="/"
              style={{
                fontWeight: "inherit",
                fontFamily: "inherit",
                fontSize: "17px",
                right: "2%",
                color: "#a27356",
              }}
              sx={{ my: 1, color: "black", display: "block" }}
            >
              سفارش ها
            </Button>
          </Box>

          <Button
            style={{
              fontWeight: "bold",
              fontFamily: "inherit",
              color: "#a27356",
              width: "auto",
            }}
            className={classes.button}
            onClick={tableButton}
            sx={{ my: 1, color: "#ffffff", display: "block" }}
          >
            {status ? status : "میز را انتخاب کنید"}
          </Button>
          <Dialog open={openModal} onClose={() => setOpenModal(false)}>
            <DialogTitle style={{ fontWeight: "bold", color: "#a27356" }}>
              انتخاب نوع میز
            </DialogTitle>
            <DialogContent>
              <Typography style={{ fontWeight: "600", color: "#a27356" }}>
                لطفاً نوع میز خود را انتخاب کنید:
              </Typography>
            </DialogContent>
            <DialogActions
              style={{ display: "flex", flexDirection: "row-reverse" }}
            >
              <Button
                style={{backgroundColor:"#a27356",color:"#ffffff"}}
                variant="contained"
                onClick={() => handleTableSelection("میز یک نفره")}
              >
                میز یک نفره
              </Button>
              <Button
                style={{backgroundColor:"#a27356",color:"#ffffff"}}
                variant="contained"
                onClick={() => handleTableSelection("میز دو نفره")}
              >
                میز دو نفره
              </Button>
              <Button
                style={{backgroundColor:"#a27356",color:"#ffffff"}}
                variant="contained"
                onClick={() => handleTableSelection("میز سه نفره")}
              >
                میز سه نفره
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;

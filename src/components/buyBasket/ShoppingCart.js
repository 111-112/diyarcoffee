import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useNavigate } from "react-router-dom";
import basketEmpty from "../../assets/images/logo/basketEmpty.png";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30%",
    backgroundColor: theme.palette.background.paper,
    margin: "36px 0px 20px 20px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: "28px",
      width: "100%",
      margin: "0",
      padding: "10px",
      position: "fixed",
      bottom: "0",
      left: "0",
      backgroundColor: "#ffffff",
      color: "black",
      zIndex: 1000, // اضافه کردن z-index
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  },
  header: {
    backgroundColor: "#faebd7",
    color: "black",
    fontWeight: "bold",
    width: "100%",
    fontFamily: "inherit",
    textAlign: "center",
    padding: theme.spacing(1),
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    [theme.breakpoints.down("md")]: {
      backgroundColor: "transparent",
      fontFamily: "inherit",
      color: "black",
      width: "40%",
      paddingBottom: "30px",
      paddingRight: "40px",
      paddingTop: "27.5px",
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0",
    },
  },
  headerModal: {
    color: "black",
    width: "100%",
    padding: "8px",
    textAlign: "center",
    backgroundColor: "#faebd7",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  body: {
    width: "100%",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  footer: {
    backgroundColor: "#faebd7",
    color: "black",
    width: "100%",
    textAlign: "center",
    padding: theme.spacing(1),
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    [theme.breakpoints.down("md")]: {
      backgroundColor: "transparent",
    },
  },
  footerModal: {
    color: "black",
    width: "100%",
    padding: "8px",
    textAlign: "center",
    backgroundColor: "#faebd7",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  },
  item: {
    width: "100%",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  itemTitle: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  itemPrice: {
    color: theme.palette.text.secondary,
    fontFamily:"inherit"
  },
  controls: {
    display: "flex",
    alignItems: "center",
  },
  quantity: {
    margin: theme.spacing(0, 2),
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: "#a27356",
    color: "white",
    fontFamily: "inherit",
    fontWeight: "bold",
    borderRadius: "30px",
    fontSize: "20px",
    "&:hover": {
      backgroundColor: "#a27356bf",
      color: "white",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "0",
      color: "#ffffff",
      fontSize: "medium",
      borderRadius: "30px",
      backgroundColor: "#a27356",
      "&:hover": {
        backgroundColor: "#a27356bf",
      },
    },
  },
  btnPlusMinus: {
    color: "#a27356",
    boxShadow:
      "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "&:hover": {
      backgroundColor: "#a27356",
      color: "#ffffff",
    },
  },
  divDialog: {
    paddingLeft: "6%",
    paddingBottom: "4%",
    margin: "10px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "6%",
      paddingBottom: "4%",
    },
  },
}));

const ShoppingCart = ({
  getBuyBasket,
  totalPrice,
  addItem,
  removeItem,
  statusItem,
  basketLength,
}) => {
  const classes = useStyles();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // گروه‌بندی آیتم‌ها با عنوان مشابه
  const groupedItems = getBuyBasket.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.title === item.title);
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.price += item.price;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);
  const ff = () => {
    nav("/order/checkout");
  };
  function toPersianDigits(input) {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const str = String(input); 
    return str.replace(/[0-9]/g, function (w) {
      return persianDigits[w];
    });
  }
  let persianNumber = toPersianDigits(totalPrice);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1290);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1290);
    };
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {isMobile ? (
        <Paper className={classes.root}>
          <Typography
            variant="h6"
            className={classes.header}
            onClick={handleOpen}
          >
            سبد خرید ({basketLength})
          </Typography>
          <Button className={classes.button} onClick={ff}>
            {persianNumber} تومان
          </Button>
        </Paper>
      ) : (
        <Paper className={classes.root}>
          <Typography variant="h6" className={classes.header}>
            سبد خرید ({basketLength})
          </Typography>
          {statusItem ? (
            <div className={classes.body}>
              <SimpleBar
                style={{
                  maxHeight: "350px",
                  width: "276px",
                  paddingLeft: "16px",
                }}
              >
                {Array.isArray(getBuyBasket) &&
                  getBuyBasket.map((value, index) => (
                    <div key={index} className={classes.item}>
                      <div className={classes.itemTitle}>
                        <div>
                          <Typography
                            style={{ fontWeight: "bold",fontFamily:"inherit" }}
                            variant="body1"
                          >
                            {value.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            className={classes.itemPrice}
                          >
                            {value.price} تومان
                          </Typography>
                        </div>
                        <div className={classes.controls}>
                          <IconButton
                            onClick={() => removeItem(value.id)}
                            size="small"
                            color="primary"
                            className={classes.btnPlusMinus}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography className={classes.quantity}>
                            {value.quantity}
                          </Typography>
                          <IconButton
                            onClick={() =>
                              addItem(
                                value.id,
                                value.title,
                                value.description,
                                value.price,
                                value.photo
                              )
                            }
                            size="small"
                            color="primary"
                            className={classes.btnPlusMinus}
                          >
                            <AddIcon />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  ))}
              </SimpleBar>
            </div>
          ) : (
            <>
              <img
                style={{ width: "inherit", paddingTop: "inherit" }}
                src={basketEmpty}
              />
              <div className={classes.body}>سبد خرید خالی است</div>
            </>
          )}
          <Divider />
          <div className={classes.footer}>
            <Typography style={{fontFamily:"inherit"}} variant="h6">هزینه کل: {persianNumber} تومان</Typography>
            <Button onClick={ff} className={classes.button}>
              تکمیل سفارش
            </Button>
          </div>
        </Paper>
      )}
      <Dialog style={{ padding: "3%" }} open={open} onClose={handleClose}>
        <div className={classes.divDialog}>
          <DialogTitle>
            <div className={classes.headerModal}>
              <Typography style={{ fontWeight: "bold" ,fontFamily:"Shabnam"}}>
                سبد خرید ({basketLength}){" "}
              </Typography>{" "}
            </div>
          </DialogTitle>
          {statusItem ? (
            <DialogContent style={{ overflowY: "unset" }}>
              {getBuyBasket.map((value, index) => (
                <div key={index} className={classes.item}>
                  <div className={classes.itemTitle}>
                    <div>
                      <Typography style={{fontFamily:"Shabnam"}} variant="body1">{value.title}</Typography>
                      <Typography variant="body2" className={classes.itemPrice}>
                        {value.price} تومان
                      </Typography>
                    </div>
                    <div className={classes.controls}>
                      <IconButton
                        onClick={() => removeItem(value.id)}
                        size="small"
                        color="primary"
                        className={classes.btnPlusMinus}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography className={classes.quantity}>
                        {value.quantity}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          addItem(
                            value.id,
                            value.title,
                            value.description,
                            value.price / value.quantity,
                            value.photo
                          )
                        }
                        size="small"
                        color="primary"
                        className={classes.btnPlusMinus}
                      >
                        <AddIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
              <Divider />
              <div className={classes.footerModal}>
                <Typography style={{fontFamily:"Shabnam"}} variant="h6">
                  هزینه کل: {persianNumber} تومان
                </Typography>
              </div>
            </DialogContent>
          ) : (
            <div>
              <img
                style={{ width: "20%", paddingRight: "43%" }}
                className={classes.body}
                src={basketEmpty}
              />
              <div className={classes.body}>سبد خرید خالی است</div>
            </div>
          )}
          <DialogActions>
            <Button
              style={{ marginLeft: "14px" }}
              className={classes.button}
              onClick={handleClose}
              color="primary"
            >
              بستن
            </Button>
            <Button className={classes.button} onClick={ff}>
              تکمیل سفارش
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default ShoppingCart;

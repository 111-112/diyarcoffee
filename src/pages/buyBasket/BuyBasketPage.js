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
import { useDispatch, useSelector } from "react-redux";
import {
  BASKET_ADDED,
  BASKET_REMOVE,
  SWITCH_STATUS_BASKET,
  getStatusBasket,
  getTotalPrice,
} from "../../redux/slices/buyBasket";
import { useNavigate } from "react-router-dom";
import basketEmpty from "../../assets/images/logo/basketEmpty.png";
import TableBarOutlinedIcon from "@mui/icons-material/TableBarOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "96%",
    padding: theme.spacing(2),
    textAlign: "center",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    margin: "36px 0px 20px 20px",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: "50%",
      padding: "25%",
      textAlign: "center",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      backgroundColor: theme.palette.background.paper,
      margin: "36px 0px 20px 20px",
      borderRadius: "10px",
      boxShadow: theme.shadows[5],
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  header: {
    backgroundColor: "#faebd7",
    color: "black",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    fontFamily: "inherit",
    padding: theme.spacing(1),
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
    fontWeight: "bold",
    width: "30%",
    fontFamily: "inherit",
    color: "#ffffff",
    boxShadow:
      "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "&:hover": {
      backgroundColor: "#7e5841",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(2),
      boxShadow:
        "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
      backgroundColor: "#a27356",
      fontWeight: "bold",
      width: "50%",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#7e5841",
      },
    },
  },
  btnPlusMinus: {
    boxShadow:
      "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    border: "initial",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    color: "#a27356",
    "&:hover": {
      backgroundColor: "#a27356",
      color: "white",
    },
  },
  textFooter: {
    fontFamily: "inherit",
    fontSize: "large",
    [theme.breakpoints.down("xs")]: {
      fontFamily: "inherit",
      fontSize: "13px",
    },
  },
}));

const BuyBasketPage = () => {
  const classes = useStyles();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.entities.category.value);
  const status = useSelector((state) => state.entities.status.value);
  const getBuyBasket = useSelector((state) => state.entities.buyBasket.value);
  const totalPrice = useSelector(getTotalPrice);
  const statusBasket = useSelector(getStatusBasket);
  const basketBuyLength2 = useSelector(
    (state) => state.entities.buyBasket.basketBuyLength
  );
  const itemCounts2 = useSelector(
    (state) => state.entities.buyBasket.itemCounts
  );
  const [data, setData] = useState([]);
  const [itemCounts, setItemCounts] = useState(() => {
    const savedItemCounts = localStorage.getItem("itemCounts");
    return savedItemCounts ? JSON.parse(savedItemCounts) : {};
  });

  useEffect(() => {
    setData(getBuyBasket);
    if (basketBuyLength2 == 0) {
      dispatch(SWITCH_STATUS_BASKET({ statusBasket: false }));
    }
  }, [getBuyBasket]);
  const dd = () => {
    console.log(getBuyBasket);
    console.log(status);
  };

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

  const addItem = (id, title, description, price, photo) => {
    /* const data = Object.values(itemCounts);
        setBasketBuyLength(
          data.reduce((accumulator, currentValue) => accumulator + currentValue, 1)
        );*/
    console.log(basketBuyLength2);
    console.log(itemCounts2);
    /* setItemCounts((prevCounts) => ({
          ...prevCounts,
          [id]: (prevCounts[id] || 0) + 1,
        }));*/
    setItemCounts((prevCounts) => {
      const newCounts = { ...prevCounts, [id]: (prevCounts[id] || 0) + 1 };
      localStorage.setItem("itemCounts", JSON.stringify(newCounts));
      return newCounts;
    });
    dispatch(
      BASKET_ADDED({
        id,
        title,
        description,
        price,
        photo,
        quantity: (itemCounts[id] || 0) + 1,
      })
    );
  };

  const removeItem = (id) => {
    /* setItemCounts((prevCounts) => ({
          ...prevCounts,
          [id]: (prevCounts[id] || 0) > 0 ? prevCounts[id] - 1 : 0,
        }));*/
    setItemCounts((prevCounts) => {
      const newCounts = {
        ...prevCounts,
        [id]: prevCounts[id] > 0 ? prevCounts[id] - 1 : 0,
      };
      localStorage.setItem("itemCounts", JSON.stringify(newCounts));
      return newCounts;
    });
    dispatch(
      BASKET_REMOVE({
        id,
      })
    );
  };

  const ff = () => {
    console.log("status", status);
    nav("/order/checkout");
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h6" className={classes.header}>
        سبد خرید ({basketBuyLength2})
      </Typography>

      {statusBasket ? (
        <div className={classes.body}>
          {Array.isArray(getBuyBasket) &&
            getBuyBasket.map((value, index) => (
              <div key={index} className={classes.item}>
                <div className={classes.itemTitle}>
                  <div>
                    <Typography
                      style={{
                        display: "flex",
                        fontWeight: "bold",
                        fontSize: "14px",
                        position: "relative",
                        fontFamily: "inherit",
                      }}
                      variant="body1"
                    >
                      {value.title}
                    </Typography>
                    <Typography
                      style={{ display: "flex", fontFamily: "inherit" }}
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
        </div>
      ) : (
        <>
          <img
            style={{ width: "10%", paddingTop: "inherit" }}
            src={basketEmpty}
          />
          <div className={classes.body}>سبد خرید خالی است</div>
        </>
      )}
      <Divider />
      <div className={classes.footer}>
        <div style={{ display: "inline-flex" }}>
          {" "}
          <PaidOutlinedIcon
            style={{ color: "#7e5841", paddingTop: "5px", paddingLeft: "5px" }}
          />{" "}
          <Typography className={classes.textFooter} variant="h6">
            هزینه کل: {totalPrice} تومان
          </Typography>{" "}
        </div>
        <br />
        <div style={{ display: "inline-flex" }}>
          {" "}
          <TableBarOutlinedIcon
            style={{ color: "#7e5841", paddingTop: "5px", paddingLeft: "5px" }}
          />{" "}
          <Typography className={classes.textFooter} variant="h6">
            نوع میز: {status}
          </Typography>{" "}
        </div>
        <br />
        <Button onClick={ff} className={classes.button}>
          پرداخت
        </Button>
      </div>
    </Paper>
  );
};

export default BuyBasketPage;

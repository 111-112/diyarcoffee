import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStatus, setStatus } from "../../redux/slices/statusSlice";
import { setCategory, getCategory } from "../../redux/slices/categorySlice";
import {
  BASKET_ADDED,
  BASKET_LENGTH,
  BASKET_REMOVE,
  getBuyBasket,
  getTotalPrice,
  getBasketBuyLength,
  PRICE_SUM,
  getStatusBasket,
  SWITCH_STATUS_BASKET,
} from "../../redux/slices/buyBasket";
import {
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import {
  AppBar,
  Toolbar,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import banner1 from "../../assets/images/logo/logo.png";
import banner2 from "../../assets/images/slider/banner5.png";
import banner3 from "../../assets/images/slider/banner7.png";
import ShoppingCart from "../buyBasket/ShoppingCart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    direction: "rtl",
  },
  root2: {
    width: "70%",
    margin: "36px 15px 20px 15px",
    backgroundColor: "antiquewhite",
    [theme.breakpoints.down("md")]: {
      width: "97%",
      margin: "36px 5px 20px 15px",
      backgroundColor: "antiquewhite",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    display: "grid",
    height:"fit-content",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper2: {
    padding: "15px",
    width: "75%",
    display: "grid",
    height: "44ch",
    borderRadius: "10px",
    [theme.breakpoints.down("lg")]: {
      padding: "15px",
      width: "75%",
      display: "grid",
      
      borderRadius: "10px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "15px",
      width: "75%",
      display: "grid",
      height:"fit-content",
      borderRadius: "10px",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2, 0),
  },
  categoryButton: {
    margin: theme.spacing(1),
  },
  itemPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  divBtn: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "30px",
    paddingTop: "inherit",
    backgroundColor: "transparent",
  },
  button: {
    margin: theme.spacing(1),
    width: 50,
    height: 50,
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
}));

const images = [`${banner1}`, `${banner2}`, `${banner3}`];

const CoffeeList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [menuData, setMenuData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [statusItem, setStatusItem] = useState(false);
  const [basketData, setBasketData] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(1); // تعداد پیش‌فرض اسلایدها برای موبایل
  const swiperRef = useRef(null);
  const categories = useSelector((state) => state.entities.category.value);
  const status = useSelector((state) => state.entities.status.value);
  const getBuyBasket = useSelector((state) => state.entities.buyBasket.value);
  const totalPrice = useSelector(getTotalPrice);
  const statusBasket = useSelector(getStatusBasket);
  const getCategory = useSelector((state) => state.entities.category.value);
  const basketBuyLength2 = useSelector(
    (state) => state.entities.buyBasket.basketBuyLength
  );
  const itemCounts2 = useSelector(
    (state) => state.entities.buyBasket.itemCounts
  );
  const [itemCounts, setItemCounts] = useState(() => {
    const savedItemCounts = localStorage.getItem("itemCounts");
    return savedItemCounts ? JSON.parse(savedItemCounts) : {};
  });
  // const itemCounts2 = useSelector(getItemCounts);

  const handleClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (swiperRef.current) {
      swiperRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    //setStatusItem(true);
    if ( basketBuyLength2 == 0) {
      dispatch(SWITCH_STATUS_BASKET({ statusBasket: false }));
    }
    localStorage.setItem("itemCounts", JSON.stringify(itemCounts));
    console.log(getBuyBasket);
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/menuData");
        dispatch(setCategory(response.data.menu));
        setMenuData(response.data.menu);
        console.log(menuData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    setTimeout(() => {
      console.log(itemCounts);
      // console.log(itemCounts2);
      /*if(itemCounts=={}){
        setStatusItem(false)
      }*/
    }, 2000);

    const handleResize = () => {
      const isDesktop = window.innerWidth > 1000; // فرض اینجا این است که 768 پیکسل به عنوان حد انتقال از موبایل به دسکتاپ استفاده شده است
      const isTablet = window.innerWidth > 680; // فرض اینجا این است که 768 پیکسل به عنوان حد انتقال از موبایل به دسکتاپ استفاده شده است
      const isMobilelittleSize = window.innerWidth < 480; // فرض اینجا این است که 768 پیکسل به عنوان حد انتقال از موبایل به دسکتاپ استفاده شده است
      setSlidesToShow(
        isDesktop ? 4 : isTablet ? 3 : isMobilelittleSize ? 1 : 2
      );
    };

    console.log(itemCounts);
    handleResize(); // بررسی وضعیت اولیه صفحه
    window.addEventListener("resize", handleResize); // بررسی تغییرات اندازه صفحه

    return () => {
      window.removeEventListener("resize", handleResize); // حذف event listener برای جلوگیری از memory leak
    };
  }, [dispatch]);

  const addItem = (id, title, description, price, unitPrice, photo) => {
    setStatusItem(true);
    /* const data = Object.values(itemCounts);
    setBasketBuyLength(
      data.reduce((accumulator, currentValue) => accumulator + currentValue, 1)
    );*/
    setItemCounts((prevCounts) => {
      const newCounts = { ...prevCounts, [id]: (prevCounts[id] || 0) + 1 };
      localStorage.setItem("itemCounts", JSON.stringify(newCounts));
      return newCounts;
    });
    dispatch(SWITCH_STATUS_BASKET({ statusBasket: true }));
    dispatch(
      BASKET_ADDED({
        id,
        title,
        description,
        price,
        unitPrice,
        photo,
        quantity: (itemCounts[id] || 0) + 1,
      })
    );
  };

  const removeItem = (id) => {
    console.log(basketBuyLength2);
    if (basketBuyLength2 == 1 || basketBuyLength2 == 0) {
      dispatch(SWITCH_STATUS_BASKET({ statusBasket: false }));
    }
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

  const d = () => {
    console.log(categories);
    console.log(status);
    console.log(totalPrice);
  };

  const params = {
    slidesPerView: "auto",
    spaceBetween: 10,
    freeMode: true,
  };

  return (
    <div style={{ display: "flex" }} className={classes.root}>
      <br />
      <br />
      <div className={classes.root2}>
        <Swiper
          slidesPerView={slidesToShow}
          spaceBetween={10}
          navigation
          modules={[Navigation]}
          className="category-swiper"
        >
          {menuData.map((category) => (
            <SwiperSlide key={category.id}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="text"
                  onClick={() => handleClick(category.id)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img
                    style={{ height: "85px", width: "85px" }}
                    src={`/logo/${category.photo}`}
                    alt="photo"
                    onClick={() => handleClick(category.id)}
                  />
                  <Typography
                    variant="body1"
                    style={{
                      color: "#300403",
                      textAlign: "center",
                      fontFamily:"Shabnam",
                      marginTop: "8px",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    {category.category}
                  </Typography>
                </Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <br />
        <br />
        <br />
        <Swiper
          spaceBetween={20}
          slidesPerView={slidesToShow}
          modules={[Navigation]}
          className="items-swiper"
        >
          {menuData
            .find((cat) => cat.id === selectedCategory)
            ?.items.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <Paper elevation={3} className={classes.paper2}>
                    <img
                      src={`/photoProduct/${item.photo}`}
                      style={{ width: "100%" }}
                    />
                    <Typography
                      style={{ fontWeight: "bold", fontSize: "inherit",fontFamily:"inherit" }}
                      variant="h6"
                    >
                      {item.title}
                    </Typography>
                    <Typography style={{fontFamily:"inherit"}} variant="body2">{item.description}</Typography>
                    <Typography style={{fontFamily:"inherit"}} variant="subtitle1">
                      قیمت:{item.price} تومان
                    </Typography>
                    <div className={classes.divBtn}>
                      <button
                        onClick={() =>
                          addItem(
                            item.id,
                            item.title,
                            item.description,
                            item.price,
                            item.unitPrice,
                            item.photo
                          )
                        }
                        className={classes.button}
                      >
                        <AddIcon className={classes.icon} />
                      </button>

                      {itemCounts[item.id] ? (
                        <>
                          <p>{itemCounts[item.id]}</p>{" "}
                          <button
                            onClick={() => removeItem(item.id)}
                            className={classes.button}
                          >
                            <RemoveIcon className={classes.icon} />
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Paper>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <ShoppingCart
        getBuyBasket={getBuyBasket}
        totalPrice={totalPrice}
        addItem={addItem}
        removeItem={removeItem}
        statusItem={statusBasket}
        basketLength={basketBuyLength2}
      />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default CoffeeList;

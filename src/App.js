import React, { useState } from "react";
import "./styles.css";
import { reactLocalStorage } from "reactjs-localstorage";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) => ({
  card: {
    float: "left",
    width: "60%",
    marginBottom: 3
  },
  avatar: {
    float: "left",
    margin: 5,
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  icoBtn: {
    float: "right"
  },
  itemName: {
    float: "left",
    margin: 8
  }
}));

export default function App() {
  const classes = useStyles();
  let myObj = [
    {
      id: 9090,
      name: "Item1",
      price: 200,
      discount: 10,
      type: "fiction",
      img_url: "https://place-hold.it/40.jpg"
    },
    {
      id: 9091,
      name: "Item2",
      price: 250,
      discount: 15,
      type: "literature",
      img_url: "https://place-hold.it/40.jpg"
    },
    {
      id: 9092,
      name: "Item3",
      price: 320,
      discount: 5,
      type: "literature",
      img_url: "https://place-hold.it/40.jpg"
    },
    {
      id: 9093,
      name: "Item4",
      price: 290,
      discount: 0,
      type: "thriller",
      img_url: "https://place-hold.it/40.jpg"
    },
    {
      id: 9094,
      name: "Item5",
      price: 500,
      discount: 25,
      type: "thriller",
      img_url: "https://place-hold.it/40.jpg"
    },
    {
      id: 9095,
      name: "Item6",
      price: 150,
      discount: 5,
      type: "literature",
      img_url: "https://place-hold.it/40.jpg"
    },
    {
      id: 9096,
      name: "Item7",
      price: 700,
      discount: 22,
      type: "literature",
      img_url: "https://place-hold.it/40.jpg"
    },
    {
      id: 9097,
      name: "Item8",
      price: 350,
      discount: 18,
      type: "fiction",
      img_url: "https://place-hold.it/40.jpg"
    }
  ];

  const [itemArr, setItemArr] = useState(getItems()[0]);
  const [calculations, setCalculations] = useState(getItems()[1]);
  const [noOfItems, setnoOfItems] = useState(calculations[0]);
  const [cost, setCost] = useState(calculations[1]);
  const [disc, setdisc] = useState(calculations[2]);
  const [tDisc, setTDisc] = useState(calculations[3]);
  const [total, setTotal] = useState(calculations[4]);
  function Update(step, id) {
    let itemId = id;
    if (step === 1) {
      //Delete
      let temp = itemArr;
      temp.splice(itemId, 1);
      store(temp);
      setItemArr(getItems()[0]);
    } else if (step === 2) {
      //plus item
      itemArr[itemId][6] += 1;
      document.getElementById(itemId).innerHTML = itemArr[itemId][6];
      setItemArr(itemArr);
      store(itemArr);
    } else {
      //minus item
      if (step === 3 && itemArr[itemId][6] > 1) {
        itemArr[itemId][6] -= 1;
        document.getElementById(itemId).innerHTML = itemArr[itemId][6];
        setItemArr(itemArr);
        store(itemArr);
      }
    }
    let calc = getItems()[1];
    setCalculations(calc);
    setnoOfItems(calc[0]);
    setCost(calc[1]);
    setdisc(calc[2]);
    setTDisc(calc[3]);
    setTotal(calc[4]);
  }

  return (
    <div className="App">
      <Container className="container">
        <div className="Items">
          <br />
          <hr />
          <div style={{ float: "left", width: "61%" }}>
            <i style={{ float: "left", marginLeft: 8 }}> Items (7)</i>
          </div>
          <i style={{ float: "left", marginLeft: "35px" }}> Qty</i>
          <i style={{ float: "right", width: "12%" }}> Price</i>
          <br />
          <hr />
          {itemArr.length ? (
            ""
          ) : (
            <button
              onClick={() => {
                setItemArr(reset(myObj));
                Update(0, -1);
              }}
            >
              Reset
            </button>
          )}
          {itemArr.map((number, index) => (
            <div style={{ marginBottom: "10px" }} key={index}>
              {/* {console.log(number[0], " ", number[6])} */}
              <Card className={classes.card}>
                <Avatar
                  className={classes.avatar}
                  alt="Cindy Baker"
                  src={number[5]}
                />
                <Typography
                  className={classes.itemName}
                  variant="h6"
                  component="h3"
                >
                  {number[1]}
                </Typography>
                <IconButton
                  onClick={() => Update(1, index)}
                  className={classes.icoBtn}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
              <IconButton
                style={{
                  float: "left",
                  padding: 0,
                  marginTop: 12,
                  marginLeft: 5
                }}
                aria-label="delete"
                onClick={() => Update(3, index)}
              >
                <RemoveIcon />
              </IconButton>
              <label
                style={{
                  float: "left",
                  width: "10%",
                  marginTop: 9,
                  border: "2px solid grey",
                  padding: "4px 0px"
                }}
                id={index}
              >
                {number[6]}
              </label>
              <IconButton
                onClick={() => Update(2, index)}
                style={{ float: "left", padding: 0, marginTop: 12 }}
                aria-label="delete"
              >
                <PlusOneIcon />
              </IconButton>
              <label
                style={{
                  marginTop: 15,
                  float: "right",
                  width: "12%"
                }}
                id="outlined-basic"
              >
                ${number[2]}
              </label>
            </div>
          ))}
        </div>
        <div className="Bill">
          <div
            style={{
              border: "2px solid grey",
              height: "200px"
            }}
          >
            <h3
              style={{ padding: "0px 25px", marginBottom: 0, display: "flex" }}
            >
              Total
            </h3>
            <div
              style={{
                padding: "0px 25px",
                display: "flex",
                justifyContent: "space-between",
                margin: "15px 0px"
              }}
            >
              <h4 id="noi">Items ( {noOfItems} )</h4>
              <h4>:</h4>
              <h4>$ {cost}</h4>
            </div>
            <div
              style={{
                padding: "0px 25px",
                display: "flex",
                justifyContent: "space-between",
                margin: "4px 0px"
              }}
            >
              <h4>Discount</h4>
              <h4>:</h4>
              <h4>- $ {disc}</h4>
            </div>
            <div
              style={{
                padding: "0px 25px",
                display: "flex",
                justifyContent: "space-between",
                margin: "4px 0px"
              }}
            >
              <h4>Type discount</h4>
              <h4>:</h4>
              <h4>- $ {tDisc}</h4>
            </div>
            <div
              style={{
                display: "flex",
                backgroundColor: "#c1bcbc",
                justifyContent: "space-between",
                margin: "15px 0px",
                padding: "14.5px 25px"
              }}
            >
              <h4>Order total</h4>
              <h4>$ {total}</h4>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function reset(myObj) {
  let temp = [];
  for (let i = 0; i < myObj.length; i++) {
    temp.push([
      myObj[i].id,
      myObj[i].name,
      myObj[i].price,
      myObj[i].discount,
      myObj[i].type,
      myObj[i].img_url,
      1
    ]);
  }

  return store(temp);
}

function store(myObj) {
  reactLocalStorage.setObject("len", myObj.length);
  for (let i = 0; i < myObj.length; i++) {
    reactLocalStorage.setObject("id" + i, myObj[i][0]);
    reactLocalStorage.setObject("name" + i, myObj[i][1]);
    reactLocalStorage.setObject("price" + i, myObj[i][2]);
    reactLocalStorage.setObject("discount" + i, myObj[i][3]);
    reactLocalStorage.setObject("type" + i, myObj[i][4]);
    reactLocalStorage.setObject("img_url" + i, myObj[i][5]);
    reactLocalStorage.setObject("qty" + i, myObj[i][6]);
  }
  return myObj;
}

function getItems() {
  let tempArr = [];
  let len = reactLocalStorage.getObject("len");
  let cost = 0,
    disc = 0,
    tDisc = 0,
    total = 0;
  if (Number(len) > 0) {
    for (let i = 0; i < Number(len); i++) {
      let id = Number(reactLocalStorage.getObject("id" + i)),
        name = reactLocalStorage.getObject("name" + i),
        price = reactLocalStorage.getObject("price" + i),
        discount = Number(reactLocalStorage.getObject("discount" + i)),
        type = reactLocalStorage.getObject("type" + i),
        img = reactLocalStorage.getObject("img_url" + i),
        qty = reactLocalStorage.getObject("qty" + i);

      cost += qty * price;
      disc += (discount / 100) * (qty * price);
      tDisc += type === "fiction" ? qty * price * 0.15 : 0;
      total = cost - (disc + tDisc);
      // console.log(type === "fiction" ? price * 0.15 : 0);

      tempArr.push([id, name, price, discount, type, img, qty]);
    }
  }
  return [tempArr, [len, cost, disc, tDisc, total]];
}

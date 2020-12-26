import React, { useState } from "react";
import "./styles.css";
import swal from "sweetalert";
import myObjt from "./myObj";
import { reactLocalStorage } from "reactjs-localstorage";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
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
  let myObj = myObjt.map(Object.values);
  let initial_elem = getItems(myObj)[0];
  const [itemArr, setItemArr] = useState(initial_elem);
  const [cost, setCost] = useState(getItems(myObj)[1][0]);
  const [disc, setDisc] = useState(getItems(myObj)[1][1]);
  const [tDisc, setTDisc] = useState(getItems(myObj)[1][2]);
  const [total, setTotal] = useState(getItems(myObj)[1][3]);
  const [noOfItems, setNoOfItems] = useState(getItems(myObj)[1][4]);

  function Update(step, id) {
    if (step === 1) {
      //Delete
      let temp = itemArr;
      swal(temp[id][1] + " !", "Item has been deleted!", "error");
      temp.splice(id, 1);
      store(temp);
      setItemArr(getItems(myObj)[0]);
    } else if (step === 2) {
      //plus item
      itemArr[id][6] += 1;
      document.getElementById(id).innerHTML = itemArr[id][6];
      setItemArr(itemArr);
      store(itemArr);
    } else {
      //minus item
      if (step === 3 && itemArr[id][6] > 1) {
        itemArr[id][6] -= 1;
        document.getElementById(id).innerHTML = itemArr[id][6];
        setItemArr(itemArr);
        store(itemArr);
      }
    }
    setItemArr(getItems(myObj)[0]);
    setCost(getItems(myObj)[1][0]);
    setDisc(getItems(myObj)[1][1]);
    setTDisc(getItems(myObj)[1][2]);
    setTotal(getItems(myObj)[1][3]);
    setNoOfItems(getItems(myObj)[1][4]);
  }

  return (
    <div className="App">
      <Container className="container">
        <div className="Items">
          <br />
          <hr />
          <div style={{ float: "left", width: "61%" }}>
            <i style={{ float: "left", marginLeft: 8 }}>
              Items ( {itemArr.length} )
            </i>
          </div>
          <i style={{ float: "left", marginLeft: "35px" }}> Qty</i>
          <i style={{ float: "right", width: "12%" }}> Price</i>
          <br />
          <hr />
          {itemArr.length ? (
            ""
          ) : (
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<RotateLeftIcon />}
              onClick={() => {
                reset(myObj);
                Update(0, -1);
              }}
            >
              Reset
            </Button>
          )}
          {itemArr.map((number, index) => (
            <div style={{ marginBottom: "10px" }} key={number[0]}>
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
              <h4>Items ( {noOfItems} )</h4>
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
              <h4>- $ {total}</h4>
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
      myObj[i][0],
      myObj[i][1],
      myObj[i][2],
      myObj[i][3],
      myObj[i][4],
      myObj[i][5],
      1
    ]);
  }
  store(temp);
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
}

function getItems(myObj) {
  let tempArr = [];
  let len = Number(reactLocalStorage.getObject("len"));
  let cost = 0,
    disc = 0,
    tDisc = 0,
    total = 0,
    noOfItems = 0;
  if (len > 0) {
    for (let i = 0; i < len; i++) {
      let id = Number(reactLocalStorage.getObject("id" + i)),
        name = reactLocalStorage.getObject("name" + i),
        price = reactLocalStorage.getObject("price" + i),
        discount = Number(reactLocalStorage.getObject("discount" + i)),
        type = reactLocalStorage.getObject("type" + i),
        img = reactLocalStorage.getObject("img_url" + i),
        qty = reactLocalStorage.getObject("qty" + i);

      cost += qty * price;
      noOfItems += qty;
      disc += (discount / 100) * (qty * price);
      tDisc += type === "fiction" ? qty * price * 0.15 : 0;
      total = cost - (disc + tDisc);
      // console.log(type === "fiction" ? price * 0.15 : 0);

      tempArr.push([id, name, price, discount, type, img, qty]);
    }
  } else {
    if (len !== 0) {
      reset(myObj);
      return getItems(myObj);
    }
  }
  return [tempArr, [cost, disc, tDisc, total, noOfItems]];
}

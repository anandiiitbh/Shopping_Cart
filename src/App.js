import React from "react";
import "./styles.css";

export default function App() {
  let myObj = [{ "id": 9090, "name": "Item1", "price": 200, "discount": 10, "type": "fiction", "img_url": "https://place-hold.it/40.jpg" }, { "id": 9091, "name": "Item2", "price": 250, "discount": 15, "type": "literature", "img_url": "https://place-hold.it/40.jpg" }, { "id": 9092, "name": "Item3", "price": 320, "discount": 5, "type": "literature", "img_url": "https://place-hold.it/40.jpg" }, { "id": 9093, "name": "Item4", "price": 290, "discount": 0, "type": "thriller", "img_url": "https://place-hold.it/40.jpg" }, { "id": 9094, "name": "Item5", "price": 500, "discount": 25, "type": "thriller", "img_url": "https://place-hold.it/40.jpg" }, { "id": 9095, "name": "Item6", "price": 150, "discount": 5, "type": "literature", "img_url": "https://place-hold.it/40.jpg" }, { "id": 9096, "name": "Item7", "price": 700, "discount": 22, "type": "literature", "img_url": "https://place-hold.it/40.jpg" }, { "id": 9097, "name": "Item8", "price": 350, "discount": 18, "type": "fiction", "img_url": "https://place-hold.it/40.jpg" }];
          

  function On_Start() {
      if(typeof(Storage) !== "undefined") {
          if (localStorage.clickcount) {
              var data="";
              for(var i = 0; i < Number(localStorage.clickcount) ; i++){
                  var subs=i.toString();
                  data+="<p>"+localStorage.getItem("id"+subs)+"\t"+localStorage.getItem("name"+subs)+"\t"+localStorage.getItem("price"+subs)+"\t"+localStorage.getItem("discount"+subs)+"\t"+localStorage.getItem("type"+subs)+"\t"+localStorage.getItem("img_url"+subs)+"</p>";
              }
              document.getElementById("demo").innerHTML=data;
          } else {
              localStorage.setItem("clickcount",myObj.length);
              
              for(var i = 0; i < myObj.length ; i++){
                  var subs=i.toString();
                  localStorage.setItem("id"+subs,myObj[i].id);
                  localStorage.setItem("name"+subs,myObj[i].name);
                  localStorage.setItem("price"+subs,myObj[i].price);
                  localStorage.setItem("discount"+subs,myObj[i].discount);
                  localStorage.setItem("type"+subs,myObj[i].type);
                  localStorage.setItem("img_url"+subs,myObj[i].img_url);
              }
              On_Start();
          }
          
          
      } else {
         console.log("Sorry, your browser does not support web storage...");
      }
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

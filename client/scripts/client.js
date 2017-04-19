let myApp = angular.module('myApp', []);


myApp.factory('GameService', [function(){
  let startingPrice = 5;
  class MarketItem {
    constructor(name){
    this.name = name;
    this.price = startingPrice;
    setInterval(() =>{
      this.fluctuate();
      console.log(this.price);
    }, 1000);
  }
  fluctuate(){
    this.price += (Math.random()-0.5);
    this.price = Math.max(0.5, this.price);
    this.price = Math.min(9.99, this.price);
  }
}

class User{
  let startingPrice = 5;
  class MarketItem {
    constructor(name){
    this.name = name;
    this.price = startingPrice;
    setInterval(() =>{
      this.fluctuate();
    }, 1000);
  }
  fluctuate(){
    this.price += (Math.random()-0.5);
    this.price = Math.max(0.5, this.price);
    this.price = Math.min(9.99, this.price);
  }
}

class User{
  constructor(){
    this.cash = 0;
    this.inventory = {};
  }
  buy(item){
    // let prevQty = (this.inventory[item.name].qty || 0);
    // let prevAvgPrice = (this.inventory[item.name].avgPrice || 0);
    // this.inventory[item.name].qty =  this.inventory[item.name].qty ? this.inventory[item.name].qty++ : 1;
    // let totalCost = prevQty*prevAvgPrice + item.price;
    // this.inventory[item.name].avgPrice = totalCost / this.inventory[item.name].qty;
    // console.log(this.inventory);
  }
  sell(item){

  }
}

let banana = new MarketItem('banana');
let bob = new User()

}

}]);

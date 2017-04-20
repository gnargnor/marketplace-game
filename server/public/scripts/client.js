console.log('client loaded');
let myApp = angular.module('myApp', []);

myApp.controller('MarketController', ['GameService', function(GameService){
let market = this;
market.marketService = GameService;
}]);


myApp.factory('GameService', ['$interval', function($interval) {

    class MarketItem {
        constructor(itemObject, price) {
            this.name = itemObject.name;
            this.price = price;
            this.type = itemObject.type;
            $interval(() => {
                this.fluctuate();
            }, 15000);
        }
        fluctuate() {
            this.price += (Math.random() - 0.5);
            this.price = Math.max(0.5, this.price);
            this.price = Math.min(9.99, this.price);
        }
    }
   class Collectible extends MarketItem {
     constructor(itemObject, price){
       super(itemObject, price);
     }
     fluctuate() {
         this.price += (Math.random() / 5+0.1);
   }
 }
    class User {
        constructor() {
            this.cash = 100;
            this.inventory = {};
        }
        buy(item) {
            if (!this.inventory[item.name]) {
                this.inventory[item.name] = {
                    qty: 0,
                    avgPrice: 0
                };
            }
            let invSlot = this.inventory[item.name];
            let prevQty = invSlot.qty;
            let prevAvgPrice = invSlot.avgPrice;
            invSlot.qty++;
            this.cash-=item.price;
            let totalCost = prevQty * prevAvgPrice + item.price;
            invSlot.avgPrice = totalCost / invSlot.qty;
            console.log(this.inventory);
            return invSlot;
        }
        sell(item) {
            let invSlot = this.inventory[item.name];
            invSlot.qty--;
            this.cash+=item.price;
            if (invSlot.qty == 0) {
              invSlot.avgPrice = 0;
            }

        }
    }
    let marketItemProducts = [
    {name:'Toaster',type:'MarketItem'},
    {name:'Lamp',type:'MarketItem'},
    {name:'Clock',type:'MarketItem'},
    {name:'BluRay Player',type:'MarketItem'},
    {name:'Apples',type:'Fruit'},
    {name:'Oranges',type:'Fruit'},
    {name:'Bananas',type:'Fruit'},
    {name:'Grapes',type:'Fruit'},
    {name:'Comic Books',type:'Collectible'},
    {name:'Fancy Stuffed Animals',type:'Collectible'},
    {name:'Jewelry',type:'Collectible'},
    {name:'Wine',type:'Collectible'}];

    let marketItemArray = [];

    const startingPrice = 5;

    for (let i = 0; i < marketItemProducts.length; i++) {
      let curItem;
      console.log(marketItemProducts[i]);
      switch (marketItemProducts[i].type) {
        case 'Collectible':
          curItem = new Collectible(marketItemProducts[i], startingPrice);
          break;
        default:
          curItem = new MarketItem(marketItemProducts[i], startingPrice);
      }
      console.log(curItem);
      curItem.fluctuate();
      marketItemArray.push(curItem);
    }

    let trader = new User();
    return {
     marketItemArray: marketItemArray,
     trader : trader,
   };

}]);

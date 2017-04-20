console.log('client loaded');
let myApp = angular.module('myApp', []);

myApp.controller('MarketController', ['GameService', function(GameService){
let market = this;
market.marketItemArray = GameService.marketItemArray;
market.trader = GameService.trader;
}]);


myApp.factory('GameService', [function() {

    class MarketItem {
        constructor(name, price) {
            this.name = name;
            this.price = price;
            setInterval(() => {
                this.fluctuate();
            }, 3000);
        }
        fluctuate() {
            this.price += (Math.random() - 0.5);
            this.price = Math.max(0.5, this.price);
            this.price = Math.min(9.99, this.price);
        }
    }

    class User {
        constructor() {
            this.cash = 0;
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


        }
    }
    let marketItemArray = ['Toaster', 'Lamp', 'Clock', 'BluRay Player', 'Apples', 'Oranges', 'Bananas', 'Grapes', 'Comic Books', 'Fancy Stuffed Animals', 'Jewelry', 'Wine'];

    const startingPrice = 5;

    for (let i = 0; i < marketItemArray.length; i++) {
      let curItem = marketItemArray[i];
      curItem = new MarketItem(curItem, startingPrice);
      console.log(curItem);
      curItem.fluctuate();
      marketItemArray[i] = curItem;
      console.log(marketItemArray);

    }

    let trader = new User();

    return {
     marketItemArray : marketItemArray,
     trader : trader
   };

}]);

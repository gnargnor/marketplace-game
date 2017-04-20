console.log('client loaded');
let myApp = angular.module('myApp', []);

myApp.controller('MarketController', ['GameService', function(GameService) {
    let market = this;
    market.marketService = GameService;
}]);


myApp.factory('GameService', ['$interval', function($interval) {

    class MarketItem {
        constructor(itemObject, price) {
            this.name = itemObject.name;
            this.price = price;
            this.type = itemObject.type;

        }
        fluctuate() {
            this.price += (Math.random() - 0.5);
            this.price = Math.max(0.5, this.price);
            this.price = Math.min(9.99, this.price);
        }

    }

    class Collectible extends MarketItem {
        constructor(itemObject, price) {
            super(itemObject, price);
        }
        fluctuate() {
            this.price += (Math.random() / 5 + 0.1);
        }
    }

    class Fruit extends MarketItem {
        constructor(itemObject, price) {
            super(itemObject, price);
        }
        fluctuate() {
            this.price += (Math.random() - 0.1);
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
                    avgPrice: 0,
                    type: item.type,
                    productAge: []

                };
            }
            if (item.type == 'Fruit') {
                this.inventory[item.name].productAge.push(10);
            }
            let invSlot = this.inventory[item.name];
            let prevQty = invSlot.qty;
            let prevAvgPrice = invSlot.avgPrice;
            invSlot.qty++;
            this.cash -= item.price;
            let totalCost = prevQty * prevAvgPrice + item.price;
            invSlot.avgPrice = totalCost / invSlot.qty;
            return invSlot;
        }
        sell(item) {
            let invSlot = this.inventory[item.name];
            invSlot.qty--;
            invSlot.productAge.splice(0, 1);
            this.cash += item.price;
            if (invSlot.qty == 0) {
                invSlot.avgPrice = 0;
            }



        }
    }
    let marketItemProducts = [{
            name: 'Toaster',
            type: 'MarketItem'
        },
        {
            name: 'Lamp',
            type: 'MarketItem'
        },
        {
            name: 'Clock',
            type: 'MarketItem'
        },
        {
            name: 'BluRay Player',
            type: 'MarketItem'
        },
        {
            name: 'Apples',
            type: 'Fruit'
        },
        {
            name: 'Oranges',
            type: 'Fruit'
        },
        {
            name: 'Bananas',
            type: 'Fruit'
        },
        {
            name: 'Grapes',
            type: 'Fruit'
        },
        {
            name: 'Comic Books',
            type: 'Collectible'
        },
        {
            name: 'Fancy Stuffed Animals',
            type: 'Collectible'
        },
        {
            name: 'Jewelry',
            type: 'Collectible'
        },
        {
            name: 'Wine',
            type: 'Collectible'
        }
    ];

    let marketItemArray = [];

    const startingPrice = 5;

    for (let i = 0; i < marketItemProducts.length; i++) {
        let curItem;
        console.log(marketItemProducts[i]);
        switch (marketItemProducts[i].type) {
            case 'Collectible':
                curItem = new Collectible(marketItemProducts[i], startingPrice);
                break;
            case 'Fruit':
                    curItem = new Fruit(marketItemProducts[i], startingPrice);
                    break;
            default:
                curItem = new MarketItem(marketItemProducts[i], startingPrice);
        }
        curItem.fluctuate();
        marketItemArray.push(curItem);
    }

    let trader = new User();

    $interval(() => {
        for (let i = 0; i < marketItemArray.length; i++) {
            marketItemArray[i].fluctuate();
        }
        for (let item in trader.inventory) {
            if (trader.inventory[item].type == 'Fruit') {

                console.log(trader.inventory[item].productAge);
                for (var i = 0; i < trader.inventory[item].productAge.length; i++) {
                    console.log('fruit', trader.inventory[item].productAge[i]);
                    trader.inventory[item].productAge[i]--;
                    if (trader.inventory[item].productAge[i] == 0) {
                        trader.inventory[item].productAge.splice(i, 1);
                    }
                }
                console.log(trader.inventory[item].productAge);
                trader.inventory[item].qty = trader.inventory[item].productAge.length;
            }
        }
    }, 15000);

    return {
        marketItemArray: marketItemArray,
        trader: trader,
    };

}]);

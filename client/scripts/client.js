let myApp = angular.module('myApp', []);


myApp.factory('GameService', [function() {

    class MarketItem {
        constructor(name, price) {
            this.name = name;
            this.price = price;
            setInterval(() => {
                this.fluctuate();
            }, 1000);
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
            let totalCost = prevQty * prevAvgPrice + item.price;
            invSlot.avgPrice = totalCost / invSlot.qty;
            console.log(this.inventory);
        }
        sell(item) {

        }
    }

    let banana = new MarketItem('banana', 5);
    let bob = new User()

}]);

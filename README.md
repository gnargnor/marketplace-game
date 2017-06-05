# Marketplace Game

In Marketplace, the player starts out with $100 on hand in a virtual market and is tasked with buying and selling items to generate as much money as possible.  The items fall into three different categories: _appliances_, _fruits_, and _collectibles_.  The items fluctuate in price every 15 seconds according to the item type.

Appliances serve as the model for the price fluctuation and will either increase or decrease in price by fifty cents after every fluctuation. Fruits deteriorate completely after 10 fluctuations, so the idea is to sell them before they start disappearing from your inventory.  Fruits can go down by ten cents or up by ninety.  Collectibles only go up in price and do so by as much as thirty cents.

## Getting Started

Follow the steps below to get a copy of the Marketplace application up and running on your local machine.

### Prerequisites

* Git
* Grunt  
* MongoDB  
* Node and NPM  
* RoboMongo (or a similar MongoDB management tool)  

### Installing

* Git
  * Initialize a Git repository
  * Add the remote
  * Pull the project to your local repository
```
>git init
>git remote add origin https://github.com/gnargnor/marketplace-game.git
>git pull origin master
```
* NPM  
  * Install dependencies
```
>npm install
```
* Grunt  
  * Start Grunt 
```
>grunt
```
* MongoDB  
  * Start a local MongoDB database server on port 27017
  * Replace the MongoURI in `app.js` with the local MongoDB server
```
>Mongod
```
* Node
  * Spin up the Node server
```
>npm start
```
* Browser  
  * Navigate to `localhost:5000`

## Built With

* [Node.js](https://nodejs.org)
* [Express](http://expressjs.com/)
* [Angular JS](https://angularjs.org)
* [MongoDB](https://mongodb.com)
* [Mongoose](http://mongoosejs.com)
* [Bootstrap 3](http://getbootstrap.com/)
* CSS3
* HTML5
* JavaScript ES6

## Authors

* **Logan Kelly**
  * [github.com/gnargnor](https://github.com/gnargnor)  
  * [Bizzey Tech, LLC](http://www.bizzeytech.com)  

* **Nic Wilson**  
  * [github.com/nicolaslwilson](https://github.com/nicolaswilson)  

* **Y Paul Sussman**  
  * [github.com/ypaulsussman](https://github.com/ypaulsussman)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Prime Academy](www.primeacademy.io) - assignment credit

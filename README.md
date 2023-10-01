# Market

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Project Structure

According to the requisites, this project was divided in two main modules, the Products and the Checkout.

### Products

Responsible for handling the catalog of the application's products.

Here the user can see a list of products that were fetched using a dedicated service called `products.service.ts`. For this exercise the catalog was mocked, so the available products are always the same.

#### Main features
* The user can select a specific amount of each product to add to his checkout cart;
* The user can check the price of each product per each unit (bar, dozen,...);
* The sub-total increments according to the amount selected and the price of the product;
* Once a product is added to the cart, the amount and the sub-total price are reseted and the checkout cart counter is increased.

### Checkout

Responsible for handling the application's checkout cart.

Here the user can check his checkout cart, the price and quantity of each product and the final total

#### Main features
* The user can remove any product from the list and check the updated total price (in the selected currency);
* The total price is on USD by default but the user can check the value in other currencies;

### Other modules

* Toolbar - For easy navigation and to always know the amount of products in the checkout cart;
* 404 page - So the user knows when a path is invalid;

## Technical considerations

* Sensitive data is stored in `environmnt.ts`, like the url and access key for the currency service;
* Each module has his own store implementation, so it's easy to read and maintain;
* Single Responsibility Principle was taken is consideration for easy maintenance, readability and scalability;
* Unit tests were implemented (coverage can be checked using `npm run test-coverage`);
* Error handling was implemented for the service calls, currently the error is printed to the console (a toast message logic should be implemented in the future to warn the user);

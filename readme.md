# Simple Cart For E-commerce With ExpressJS
Cart is one of features from E-commerxe there is save your products before you can buy it

## Detail Prdoucts
list of products will saved on JSON (next we'll change it with database)

## Index
use express.JS to make simple API and some methode to creat, read, and delete

### How To Use
* see the list of products with GET /api/products
* add some product with POST /api/cart by product id and quantity
* see the products you has add with GET /api/cart (there is some condition if credit has limit and stock not not available)
* see total of credit with GET /api/credit
* checkout the product you has choice with POST /api/checkout (there is some condition if credit has limit and if cart is empty)

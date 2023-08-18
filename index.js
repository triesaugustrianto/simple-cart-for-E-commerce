const express = require('express')
const app = express()
const products = require('./data/products.json')

app.use(express.json())

const port = 3000
let credit = 25000000
let cart = {}

app.get('/', (req, res) => {
    res.json({
        message : "welcome"
    })
})

app.get('/api/products', (req, res) => {
    res.json({
        data : products
    })
})

app.get('/api/credit', (req, res) => {
    res.json({
        data : credit
    })
})

app.get('/api/cart', (req,res) => {
    res.json({
        data : cart
    })
})

app.post('/api/cart', (req, res) => {
    let {productId, quantity} = req.body
    const product = products.find((product) => product.id == productId)

    if(cart[product.id]){
        quantity += cart[product.id]["quantity"] 
    } else {
       
    }
    
    if(product.stock < quantity){
        res.status(400).json({
            message : "stock tidak cukup"
        })

        return
    }

    product["quantity"] = quantity
    product["total"] = quantity * product.price
    cart[product.id] = product

    res.json({
        message : "product has add to cart",
        data : cart[product.id]
    })
})

app.delete('/api/cart', (req, res) => {
    cart = {}

    res.json({
        message : "cart has deleted"
    })
})

app.get('/api/products/:id', (req, res) => {
    const id = req.params.id

    res.json(products.find((product) => {
        return product.id == id
    }))
})

app.post('/api/checkout', (req, res) => {
    let {name, address, phone} = req.body
if(!name || !address || !phone){
    res.status(400).json({
        message : "req masih kosong"
    })
}

    if(Object.keys(cart).length == 0){//mengembalikan objek berupa array(length)
        res.json({
            message : "cart masih kosong"
        })
    }

    let total = 0
    for(const item of Object.values(cart)){
        total += item.total
    }

    if(total > credit){
        res.status(400).json({
            message : "saldo tidak cukup"
        })
    }

    credit -= total
    cart = {}
    res.status(201).json({
        message : "berhasil checkout",
        data : {
            name,
            address,
            phone,
            total,
            credit
        }
    })
})

app.listen(port, (req, res) => {
    console.log(`server runing at http://localhost:${port}`)
})
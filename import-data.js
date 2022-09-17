const dotenv=require('dotenv')
const mongoose=require('mongoose')
dotenv.config({path:'./.env'})
const Product=require('./models/productModel')
// const fs=require('fs');


// console.log(process.env)

const DB=process.env.DB_CONNECTION.replace('<PASSWORD>',process.env.PASSWORD)

mongoose.connect(DB).then(con=>{
    console.log('DB CONNECTION SUCESSFUL!')
})

const products = require('./products.json')

const importData= async ()=>{

    try{
        await Product.create(products);
        console.log('Data sucessfully added')
    }catch(err){
        console.log(err)
    }
    process.exit();
}

const deleteData = async ()=>{
    try{
        await Product.deleteMany();
        console.log('Data sucessfully deleted')
    }catch(err){
        console.log(err)
    }
    process.exit();
}

if(process.argv[2]==='--import') importData();
else if(process.argv[2]==='--delete') deleteData();

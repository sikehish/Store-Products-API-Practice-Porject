const { query } = require('express');
const Product=require('../models/productModel')

exports.getAllProductsStatic= async (req,res)=>{
    const products = await Product.find(req.query);
    res.status(200).json({
        status:"success",
        result: products.length,
        data: products
    })
}

exports.getAllProducts= async (req,res)=>{

    const queryObj={...req.query};

    if(queryObj.featured) queryObj.featured=true; else queryObj.featured=false;
    if(queryObj.name) queryObj.name= {$regex: queryObj.name, $options: 'i'}
    const words=['sort', 'fields', 'page', 'limit', 'numericFilters']
    words.map((el)=> delete(queryObj[el]));

    let queryStr= JSON.stringify(queryObj)
    queryStr=queryStr.replace(/\b(lt|gt|lte|gte)\b/g, match => `$${match}`)
    let query = Product.find(JSON.parse(queryStr))

    //  'price>=30,rating>=4'
    //{price: {$gte: 30}, rating: {$gte: 4}}
    


    if(req.query.sort) 
    {
        let str = req.query.sort;
        str=str.replaceAll(',',' ');
        // console.log(req.query.sort,str);
        query=query.sort(str)
    } else query.sort('-rating')

    if(req.query.fields) 
    {
        let str = req.query.fields;
        str=str.replaceAll(',',' ');
        // console.log(req.query.sort,str);
        query=query.select(str)
    } else query.select('-__v -createdAt ')


    const page = req.query.page*1 || 1;
    const limit = req.query.limit*1 || 10;

    query=query.skip((page-1)*limit).limit(limit);

    const products= await query;

    res.status(200).json({
        status:"success",
        result: products.length,
        data: products
    })
}
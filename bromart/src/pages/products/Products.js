import axios from "axios";


const url = ("https://dummyjson.com/products");

export function Productsdata(setData){
    axios.get(url).then(function(res){
        
        setData(res.data.products);
        

    }).catch(function(error){
        alert("Data Acess Denied");
        console.log(error);
    })
    
}

export function  Filterproducts(categoryName,setData){
    if(categoryName){
         axios.get(url).then(function(res){
        
        setData(res.data.products.filter(function(product){
            return product.category === categoryName;
        }));
        

    }).catch(function(error){
        alert("Data Acess Denied");
        console.log(error);
    })

    }else{
        Productsdata(setData);
    }
}



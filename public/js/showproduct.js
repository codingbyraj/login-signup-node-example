let app = new Vue({
    el:'.shopping-system',    
    data:{
        products:[],
        vendors:[],
        vendorForFilter:'',
        selectedVendor:''
    },
    methods:{
        getProductsByVendor:function(){            
            let url;
            let options = document.getElementById('vendor').options;
            for(let index=0;index < options.length - 1;index++){
                if(options[index].selected){
                    app.vendorForFilter = options[index].value;                    
                    break;
                }
            }
            if(app.vendorForFilter == ''){
                app.showProducts();
                return;
            }                        
            else{
                url = '/product/getProductsByVendor?id='+app.vendorForFilter;
            }

            axios.get(url)
            .then(function(res){                
                app.products = res.data;
            })
            .catch(function(err){
                console.log(err)
            })          
        },
        getVendorsName:function(){
            axios.get('/vendor/getvendors')
                .then(function(res){
                    let data = res.data;
                    for(let i in data){                                                
                        app.vendors.push(data[i]);
                    }                    
                })
                .catch(function(error){
                    console.log(error)
                })
        },
        showProducts(){
            axios.get('/product/getProducts')
                .then(function(res){
                    if(!(res.data.success)){
                        console.log("not logged in")
                    }
                    else{
                        app.products = res.data.products;
                    }
                })
                .catch(function(err){
                    console.log(err)
                })
        },
        addToCart(productId, vendorId){
            // add the item to cart
            axios.post('/product/addToCart',{
                productId:productId,
                vendorId:vendorId,
                quantity:1
            })
            .then(function(res){
                if(res.data.success){
                    alert("Product is added to cart");                                        
                }
            })
            .catch(function(error){
                console.log(error)
            })

            
        }        
    },
    beforeMount(){
        this.getVendorsName();
        this.showProducts();
    }
});


let menu = new Vue({
    el:'.menu',
    data:{},
    methods:{
        showProducts:function(){
            console.log("hi");
            axios.get('/product/getProducts')
                .then(function(res){
                    if(!(res.data.success)){
                        console.log("not logged in")
                    }
                    else{
                        app.products = res.data.products;
                    }
                })
                .catch(function(err){
                    console.log(err)
                })
        }        
    }
})
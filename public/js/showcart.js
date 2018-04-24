let app = new Vue({
    el:".shopping-system",
    data:{
        cartItems:[],
        vendors:[],
        sum:0
    },
    methods:{
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
        showCart:function(){
            axios.get('/product/showcart')
            .then((res)=>{                
                app.cartItems = res.data.cartItems;
                app.sum = 0;
                for(let i in app.cartItems){
                    app.sum = parseInt(app.sum) + parseInt(app.cartItems[i].quantity) * 
                    parseInt(app.cartItems[i].product.price)
                } 
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        increaseQuantity(cartId){
            axios.post('/product/increaseQuantityOfProduct',{
                id:cartId
            })
            .then((res)=>{
                app.showCart();
            })
            .catch((error)=>{
                console.log(error);
            })
            console.log(cartId)     
        },
        decreaseQuantity(cartId){
            axios.post('/product/decreaseQuantityOfProduct',{
                id:cartId
            })
            .then((res)=>{
                app.showCart();
            })
            .catch((error)=>{
                console.log(error);
            })
            console.log(cartId)
        }
    },
    beforeMount(){
        this.getVendorsName();
        this.showCart();
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
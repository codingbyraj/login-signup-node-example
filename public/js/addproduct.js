let app = new Vue({
    el:".shopping-system",
    data:{
        vendors:[],
        name:'',
        price:'',
        selectedVendor:''     
    },
    methods:{        
        getVendorsName:function(){
            // get all vendors name form database
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
        addProduct:function(){
            // call server method to add product
            // find the selected vendor
            let options = document.getElementById('vendor-name').options;
            for(let index=0;index < options.length - 1;index++){
                if(options[index].selected){
                    app.selectedVendor = options[index].value;
                    break;
                }
            }
            if(app.name == ''){
                alert('Enter Name');
                return false;
            }
            
            if(app.selectedVendor == ''){
                alert("Select Vendor");
                return false;
            }
            if(app.price == ''){
                alert("Enter Price");
                return false;
            }
            axios.post('/product/addproduct',{name:app.name, price:app.price, vendorId:app.selectedVendor})
            .then(function(res){
                if(res.data.success){
                    alert('product added successfully');
                }
            })
            .catch(function(error){
                alert('Oops! Data is not Correct. Enter Valid Data.');
            })
            app.clearAllFields();
        },
        clearAllFields: function(){
            app.name = '';
            app.price = '';
            app.selectedVendor = '';
        }
    },
    beforeMount(){
        this.getVendorsName()
    }
});

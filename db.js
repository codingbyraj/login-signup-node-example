const Sequelize = require('sequelize')

const db = new Sequelize('lasttry', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
})


const User = db.define('user', {
    id: {
        type: Sequelize.STRING,
        primaryKey:true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


const Vendor = db.define('vendor',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

const Product = db.define('product',{   
    name:{
        type:Sequelize.STRING
    },
    price:{
        type:Sequelize.FLOAT,
        defaultValue:0.0
    }
});

Product.belongsTo(Vendor);


const Cart = db.define('cart',{
    quantity:{
        type:Sequelize.INTEGER,
        defaultValue:1
    }
});

Cart.belongsTo(Vendor);
Cart.belongsTo(Product);
Cart.belongsTo(User);



db.sync()

module.exports = {
    db,
    User,
    Vendor,
    Product,
    Cart
}
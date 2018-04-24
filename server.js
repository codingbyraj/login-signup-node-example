const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const passport = require('./passport');
const {User} = require('./db')
const app = express();

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(session({
    secret: 'some very very secret thing',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/',express.static(__dirname+'/public',{index:'signin.html'}));
// app.use(express.static(__dirname + '/public'));
app.post('/signup', (req, res) => {
    User.findOne({
        id:req.body.id
    })
    .then((user)=>{
        res.status(500).send({
            success: false,
            message: "Your are already Registered"
        })
    })
    .catch((error)=>{
        User.create({
            name: req.body.name,
            id: req.body.id,
            password: req.body.password
        }).then((user) => {
            if (user) {
                res.redirect('/signin.html');
            }
        }).catch((err) => {
            res.status(500).send({
                success: false,
                message: "Error in Registration"
            })
        })
    })
    
});

app.post('/signin', passport.authenticate('local', {
    failureRedirect: '/signin.html',
    successRedirect: '/product',    
}))

app.get('/product', (req, res) => {
    // Only after login this url is valid    
    console.log("req user = ",req.user);    
    if (req.user) {
        res.render('products');
    } else {
        res.send("YOU ARE NOT LOGGED IN");
    }
});

app.use('/vendor', require('./routes/vendor'));

app.use('/product', require('./routes/product'));

app.listen(4444)
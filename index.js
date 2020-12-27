const express = require('express')
const app = express();
var bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const port = 8000;

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use("/static", express.static("static"));
app.use(bodyParser.urlencoded({
    extended: true
}));

// const csrfMiddleware = csrf({
//     cookie: true
// });
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// app.use(csrfMiddleware);

var admin = require("firebase-admin");

var serviceAccount = require("./getmyuser-firebase-adminsdk-3dxo8-67dd69ce9b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://getmyuser.firebaseio.com"
});

function isAuthenticated(req, res, next){
    //Check if user is logged in
    //If they are, get him access
    //If not return an error...

}

app.get('/auth', (req, res) => {
    res.render('auth.ejs');
});

app.get('/fillprofile', (req, res) => {
    res.render('fillprofile.ejs');
});

app.get('/teacherDashboard', (req, res) => {
    res.render('teacherDashboard.ejs');
});
app.get('/teacherClass/:class', (req, res) => {
    res.render('teacherClass.ejs');
});
app.get('/studentClass/:class', (req, res) => {
    res.render('studentClass.ejs');
});


// app.get('/teacherDashboard', (req, res) => {
//     res.render('teacherDashboard.ejs');
// });

app.get('/studentDashboard', (req, res) => {
    res.render('studentDashboard.ejs');
});


app.listen(process.env.port || 3000);
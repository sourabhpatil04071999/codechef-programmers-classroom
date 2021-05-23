const express = require('express')
const app = express();
var bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const port = 3000;


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
const db = admin.firestore();

async function getMarker(teacherEmail, classCode) {
    const qcodeRef = db.collection('users').doc(teacherEmail).collection('classes').doc(classCode).collection('ques');
    const snapshot = await qcodeRef.get();
    const documents = [];
    snapshot.forEach(doc => {
        documents.push(doc.id);
    });
    return documents;
}

async function fetchChefInfo(email, teacherEmail, classCode) {
    const chefInfo = require("./static/js/scrapechef");
    let questions = getMarker(teacherEmail, classCode);
    var solvedList = [];
    questions.then(async function (que) {
        console.log(que);
        const unameRef = db.collection('users').doc(email);
        const doc = await unameRef.get();
        if (!doc.exists) {
            console.log('No such user!');
            return "No such user";
        } else {
            // console.log(doc.data());
            let username = doc.data().ccusername;
            // console.log(doc.data().name);
            console.log(username);
            const list = chefInfo.getChefInfo(username);
            const solveStatusRef = db.collection('users').doc(teacherEmail).collection('classes').doc(classCode).collection('ques');

            list.then((ans) => {
                console.log(ans);
                let i;
                for (i = 0; i < que.length; i++) {
                    var truefalse = ans.includes(que[i]);
                    solvedList[que[i]] = truefalse;
                    if (truefalse) {
                        solveStatusRef.doc(que[i]).collection('solusers').doc(email).set({
                                'status': truefalse
                            })
                            .then((data) => {
                                console.log("Solve status Done");
                            }).catch((err) => {
                                console.error(err);
                            });
                    } else {
                        solveStatusRef.doc(que[i]).collection('solusers').doc(email).set({
                                'status': truefalse
                            })
                            .then((data) => {
                                console.log("Solve status Done");
                            }).catch((err) => {
                                console.error(err);
                            });
                    }
                }

            }).catch((err) => {
                console.log("Solved List err" + err);
            })
        }
    }).catch((err) => {
        console.log("NA er" + err);
    });

}


async function showProgress(info) {
    // const quesRef = db.collection('users').doc(info.teacherEmail).collection("classes").doc(info.classCode).collection(info.email).doc("solved");
    // await quesRef.set({

    // });

}



function isAuthenticated(req, res, next) {
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

app.get('/teacherClass/:class/:id/solved', (req, res) => {
    res.render('teacherClassSolved.ejs', {
        solved: "two"
    });
});

// app.post('/teacherClass/:class/:id/solved', (req, res) => {
//     let info = req.body.info;
//     console.log(info);
//     res.render('teacherClassSolved.ejs',{
//         info
//     });
// });

app.get('/studentClass/:class', (req, res) => {
    res.render('studentClass.ejs');
});


app.get('/studentDashboard', (req, res) => {
    res.render('studentDashboard.ejs');
});
app.get('/studentProfile', (req, res) => {
    res.render('studentProfile.ejs');
});

app.post('/studentClass/:class', (req, res) => {
    let info = req.body.info;

    // console.log(info);
    fetchChefInfo(info.email, info.teacherEmail, info.classCode)

    const solRef = db.collection('users').doc(teacherEmail).collection('classes').doc(classCode).collection('ques');

    //Remaining to show solved status to students.

    res.render('studentProfile.ejs');
});



app.get('/', function (req, res) {
    res.redirect('/auth');
});
app.listen(process.env.port|| 3000);













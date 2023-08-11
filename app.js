const express = require("express");
const mongoose = require("mongoose");
const routes = require("./Routes/BlogRoutes")

const app = express();

const dbURI = "mongodb+srv://ad0961:Anonymous@cluster0.z3glgip.mongodb.net/Node-basics?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}).then(
    (result) => {
        app.listen(3000);
    }
).catch((err) => console.log(err));

app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.use(express.static("public"));



app.get('/', (req, res) => {
    // res.sendFile("./views/index.html", {root: __dirname});
    console.log("request made")
    res.redirect('/blogs');

})

app.get('/about', (req, res) => {
    // res.sendFile("./views/about.html", {root: __dirname});
    res.render("about");
})

// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// })

// app.get('/create-blog', (req, res) => {
//     const blog= new blogModel({
//         title:"My blog1",
//         about:"About my new blog 1",
//         body:"body of my new blog 1"
//     })

//     blog.save().then(result => res.send(result));

// })



// app.get('/single-blog', (req, res) => {
//     blogModel.findById('64ccd5a72c387a589b977460')
//     .then(result => res.send(result))
// })

app.use('/blogs', routes);

app.use((req, res) => {
    res.status(400).render("404", {title : "404"});
})
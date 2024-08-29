import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

class post {
    constructor(contenido, usuario, id) {
        this.contenido = contenido;
        this.usuario = usuario;
        this.id = id;
    }
}


let posts = [];

//seteo el puerto
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

//utilizo bodyparser para poder leer formularios
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs", {posteos : posts});
});

app.post("/submit", (req, res) => {
    posts.push(req.body["blog-post"])
    res.redirect('/');
});

app.post("/edit", (req, res) => {
    let numero_posteo = req.body["id"];
    let post = posts[numero_posteo];
    res.render("edit.ejs", {posteo : post, numero: numero_posteo});
});

app.post("/edit/send", (req, res) => {
    let numero_posteo = req.body["id"];
    let posteo_editado = req.body["posteo"];
    posts[numero_posteo] = posteo_editado;
    res.redirect('/');
});


app.post("/delete", (req, res) => {
    let numero_posteo = req.body["id"];
    posts.splice(numero_posteo,1);
    res.redirect("/");
});
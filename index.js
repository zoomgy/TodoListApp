import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import pg from 'pg';
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
const db = new pg.Client({
    user : "postgres",
    password : "Ayush8923",
    port : 5433,
    database : "world",
    host : "localhost"
})
db.connect();
async function getTheEntry(){
    try{
        const response =  await db.query("select * from todo");
        console.log(response.rows);
        list = response.rows;
    }catch(err){
        console.log("ERROR");
    }
}
let list = [
    {id:1,work:"This is the first work."},
    {id:2,work:"This is the Second work."}
]

app.post("/delete",async (req,res)=>{
    var elementToDelete = req.query.id;
    await db.query("delete from todo where id="+elementToDelete);
    res.redirect("/");
})

app.post("/new",async (req,res)=>{
    var work = req.body.work;
    console.log(work)
    await db.query("insert into todo (work) values('"+work+"')");
    res.redirect("/");
})

app.get("/",async (req,res)=>{
    await getTheEntry();
    res.render("index.ejs",{list:list});
})

app.listen(3000,()=>{
    console.log("Server started at port 3000");
});
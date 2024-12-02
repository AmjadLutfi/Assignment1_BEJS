const express =  require("express")
const app = express()
const PORT = 3000
const fs = require("fs")

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

async function getDataBooks() {
    try {
        const dataBooks = await fs.promises.readFile("./booksdata.json", "utf-8")
        const manipulateData = JSON.parse(dataBooks)
        return manipulateData
    } catch (error) {
        return error
    }
}

app.get("/books", async(req, res)=>{
    try {
        const dataBooks = await getDataBooks()
        res.status(200).json(dataBooks)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get("/books/:id", async(req, res)=>{
    try {
        const idBooks = req.params.id
        const dataBooks = await getDataBooks()

        let booksById = dataBooks.find(el => {
            return el.id == idBooks
        })

        if (!booksById) {
            res.status(404).json("Data Not Found")
        }else{
            res.status(200).json(booksById)
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get("/ejs/books", async(req, res)=>{
    try {
        const dataBooks = await getDataBooks()
        res.render("tableBooks", {dataBooks: dataBooks})
    } catch (error) {
        res.status(500).json(error)
    }
})

app.listen(PORT, ()=>{
    console.log("Running di : " + PORT);
})
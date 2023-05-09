import books from "../models/book.js";

class BookController{
    static getBooks =(req, res) => {
        books.find()
            .populate('author')
            .exec((err, books) => {
                res.json(books);
            });
    }

    static getBook =(req, res) => {
        const {id} = req.params;
        books.findById(id)
            .populate('author')
            .exec((err, book) => {
                if(!err){
                    res.status(200)
                    .json(book);
                }else{
                    res.status(400)
                    .send({message: `FALHA AO PROCURAR LIVRO: ${err.message}`})
                }
            });
    }
    
    static getBookByPublisher = (req, res) => {
        const {publisher} = req.query;

        books.find({'publisher': publisher}, {} ,(err, books) =>{
            res.status(200)
            .send(books);
        })
    }

    static addBook = (req, res) => {
        const book = new books(req.body);
        book.save((err) => {
            if(err){
                res.status(500)
                .send({message: `FALHA AO CADASTRAR LIVRO: ${err.message}`})
            }else{
                res.status(201)
                .send(book.toJSON())
            }
        })
    }

    static updateBook = (req, res) => {
        const {id} = req.params;

        books.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200)
                .send({message: "ATUALIZADO COM SUCESSO!"});
            }else{
                res.status(500)
                .send({message: `FALHA AO ATUALIZAR LIVRO: ${err.message}`})
            }
        });
    }
    
    static deleteBook = (req, res) => {
        const {id} = req.params;

        books.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200)
                .send({message: "DELETADO COM SUCESSO!"});
            }else{
                res.status(500)
                .send({message: `FALHA AO DELETAR LIVRO: ${err.message}`})
            }
        });
    }
}

export default BookController;
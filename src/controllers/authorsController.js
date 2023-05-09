import authors from "../models/Author.js";

class AuthorController{
    static getAuthors =(req, res) => {
        authors.find((err, authors) => {
            res.json(authors);
        });
    }

    static getAuthor =(req, res) => {
        const {id} = req.params;
        authors.findById(id, (err, author) => {
            if(!err){
                res.status(200)
                .json(author);
            }else{
                res.status(400)
                .send({message: `FALHA AO PROCURAR AUTOR: ${err.message}`})
            }
        });
    }
    
    static addAuthor = (req, res) => {
        const author = new authors(req.body);
        author.save((err) => {
            if(err){
                res.status(500)
                .send({message: `FALHA AO CADASTRAR AUTOR: ${err.message}`})
            }else{
                res.status(201)
                .send(author.toJSON())
            }
        })
    }

    static updateAuthor = (req, res) => {
        const {id} = req.params;

        authors.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200)
                .send({message: "ATUALIZADO COM SUCESSO!"});
            }else{
                res.status(500)
                .send({message: `FALHA AO ATUALIZAR AUTOR: ${err.message}`})
            }
        });
    }
    
    static deleteAuthor = (req, res) => {
        const {id} = req.params;

        authors.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200)
                .send({message: "DELETADO COM SUCESSO!"});
            }else{
                res.status(500)
                .send({message: `FALHA AO DELETAR AUTOR: ${err.message}`})
            }
        });
    }
}

export default AuthorController;
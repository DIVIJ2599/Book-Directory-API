const router = require('express').Router();
const books = require('./books_data')

let booksDirectory = books;

router.get('/books',(req,res)=>{
    res.send(booksDirectory);    
});

router.get('/books/:id',async (req,res)=>{
    const{id} = req.params;
    const book = await booksDirectory.find(b.isbn==id);
    res.send(book); 
});

router.post('/books',(req,res)=>{
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body;
    const bookExist = booksDirectory.find(b.isbn===isbn)
    if(bookExist) 
    return res.send("Book Already Exists");

    const book = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    };
    booksDirectory.push(book);
    res.send(book);
});

router.put('/books/:id',(req,res)=>{
    const { id } = req.params;
    const{
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    }=req.body;

    const book = booksDirectory.find(b.isbn===id);
    if(!book)
    return res.send("Book Does not Exist");
    const update = (val,prev)=>{
        !val ? prev : val;
    }
    const updateBook = {...book,
        title:update(title,book.title),
        pageCount:update(pageCount,book.pageCount),
        publishedDate:update(publishedDate,book.publishedDate),
        thumbnailUrl:update(thumbnailUrl,book.thumbnailUrl),
        shortDescription:update(shortDescription,book.shortDescription),
        longDescription:update(longDescription,book.longDescription),
        status:update(status,book.status),
        authors:update(authors,book.authors),
        categories:update(categories,book.categories)
    };
    const Idx = booksDirectory.findIndex(b.isbn===id);
    booksDirectory.splice(Idx,1,updateBook);

    res.send(updateBook);
});

router.delete('/books/:id',(req,res)=>{
    const{id}= req.params;

    let book = booksDirectory.find(b.isbn===id);
    if(!book){
        return res.send("Book Invalid");
    }
    booksDirectory = booksDirectory.filter(b.isbn!==id);
    res.send("Data Deleted");

});


module.exports = router;
let express= require('express');

let app = express();

app.get('/', ()=>{
    res.render("Testing phase");
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
const express= require("express") //import the express module
const fileUpload =  require("express-fileupload") //import the express-fileupload module
const pdfParse =  require("pdf-parse") //import the pdf-parse module

const app =express();    // initiate express

app.use("/",express.static("public"));
app.use(fileUpload());

app.post("/extract-text",(Request,Response)=>{
    if(!Request.files && !Request.files.pdfFile){
        Response.status(400);
        Response.end();
    }
    pdfParse(Request.files.pdfFile).then(parsedData => {
        Response.send(parsedData.text.trim());
    });
})

app.listen(3000)
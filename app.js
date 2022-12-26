
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));



app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})


app.post("/", function(req, res){

   const fName = req.body.fName;
   const lName = req.body.lName;
   const email = req.body.email;

   const data = {

    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName
            }
        }
    ]
   };

   const jsonData = JSON.stringify(data);

   const url = "https://us21.api.mailchimp.com/3.0/lists/8b9ac3f744"

   const options = {
    method: "POST",
    auth: "indra100:73d2ab88c2a2f825814d16cd813a809c-us21"

   }


   const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    } else{
        res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
   });

   request.write(jsonData);
   request.end();
   

});



app.post("/failure", function(req, res){
    res.redirect("/");
})






app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000... ");
})





//API KEY : 73d2ab88c2a2f825814d16cd813a809c-us21
//List ID : 8b9ac3f744


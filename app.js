const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});


app.post("/",(req,res)=>{

   const Firstname= req.body.fname;
   const Lastname= req.body.lname;
   const Email= req.body.email;

var data={
    members:[
        {
            email_address:Email,
            status:"subscribed",
            merge_fields:{
                FNAME:Firstname,
                LNAME: Lastname,
            }
        }
    ]
};

// ------
const jsonData = JSON.stringify(data);

const url="https://us18.api.mailchimp.com/3.0/lists/e488865f14";
const options={
method:"POST",
auth:"subhajit:beba4e54cc4e18a77f8f25ac7c552f22-us18"
}


const request=https.request(url, options,function(response){



if(response.statusCode === 200){
    res.sendFile(__dirname+"/success.html");
}
else{
    res.sendFile(__dirname+"/failure.html");
}


response.on("data",function(data){
console.log(JSON.parse(data));
})
})

request.write(jsonData);
request.end();

});













app.post("/failure",(req,res)=>{
res.redirect("/");
})
 
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

// beba4e54cc4e18a77f8f25ac7c552f22-us18

// aud  e488865f14

// https://us18.admin.mailchimp.com/lists/members?id=295474#p:1-s:25-sa:last_update_time-so:false       mailchimp page list
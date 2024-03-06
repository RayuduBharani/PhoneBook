import express from 'express'
import mongoose from 'mongoose';
import ViteExpress from 'vite-express'
import PhoneBook from './model/Phonebook.cjs'

const app = express()
app.use(express.json());



// database connection 

mongoose.connect("mongodb://localhost:27017/API")
.then((req,res)=>{
    console.log("database connected");
}).catch((req,res)=>{
    console.log("some err happend in the database connection");
})

// post request 

app.post("/addPhone",async (req,res)=>{
    const details = await req.body
    console.log(details);
    const contact = new PhoneBook(details)
    contact.save().then(savedUser => {
        console.log('User saved Successfully.', savedUser)
        res.status(201).json({sucess : true})
    }).catch((err) => {
        console.error("Error Saving User.", err)
        res.status(500).json({success : false, message : err})
    })
})

// get request 

app.get("/fetchData",async (req,res)=>{
    const results = await PhoneBook.find()
    res.status(200).json(results)
})

app.get("/numbers/:id",(req,res)=>{
    PhoneBook.find({_id:req.params.id})
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        console.log("some err happened")
    })
})

// put request 

app.patch("/updatePhone/:id",async (req,res)=>{
    const data = await req.body
    PhoneBook.findByIdAndUpdate(req.params.id, data)
    .then((info)=>{
        res.send(info);
        console.log("update successfully completed")
    })
    .catch((err)=>{
        console.log("some err happened")
    })
})

// delete request 

app.delete("/deletePhone/:id",(req,res)=>{
    PhoneBook.deleteOne({_id:req.params.id})
    .then((data)=>{
        console.log(data)
        res.send({message:"the number successfully deleted"})
    })
    .catch((err)=>{
        console.log("some err happened")
    })
})

ViteExpress.listen(app,8000,(req,res)=>{
    console.log(`Ready on http://localhost:8000`)
})
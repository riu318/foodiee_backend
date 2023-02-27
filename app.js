const express=require('express')
const app=express()

//cross origin is used to share the resourses between to differnt frontend and backend
const cors=require('cors')

const PORT=5000
const HostName="localhost"

const mongoose=require('mongoose')
mongoose.set('strictQuery',false)

//required databas model
const User=require('./models/user')

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

const dbURL ="mongodb://localhost:27017/foodie"
mongoose.connect(dbURL).then(()=>{
    console.log('Connected successfully to database');
})

app.post('/signup',async(req,res)=>{
    User.findOne({email:req.body.email},(err,userData)=>{   //if the findOne() finds data it will store in userdata 
    if(userData){
        res.send({message:"seems like ur account is already presnt"})
    }else{
        const data = new User({
            name:req.body.name,
            mobileNo:req.body.mobileNo,
            email:req.body.email,
            password:req.body.password
        })
        data.save(()=>{
            if(err){
                res.send(err)
            }else{
                res.send({message:"user registered successfully"})
            }
        })
        }  
})
})


app.listen(PORT,HostName,()=>{
    console.log(`listing at the ${HostName} port on ${PORT}`);
})
const express=require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const objectId=require('mongodb').ObjectId
const app=express()
const cors=require('cors')
require('dotenv').config()
const port=process.env.PORT||5000

app.use(express.json())
app.use(cors({origin:true}))

//mongodb connections

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.qv9nz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run= async()=>{
    try{
        await client.connect()
        const collection=client.db('volunteer_network_db').collection('volunteer_services')
        const volunteerCollection=client.db('volunteer_network_db').collection('volunteers')

        //get volunteer
        app.get('/volunteerServices',async(req,res)=>{
            const volunteers= await collection.find({}).toArray()
            res.send(volunteers)

        })
        //get single volunteer
        app.get('/volunteerService/:volunteerServiceId',async(req,res)=>{
            const id=req.params.volunteerServiceId
            //console.log(id)
            const query={_id:objectId(id)}
            const volunteer= await collection.findOne(query)
            res.send(volunteer)
        })

        //post volunteer register
        app.post('/newVolunteer',async(req,res)=>{
            const newVolunteer=req.body
            const result= await volunteerCollection.insertOne(newVolunteer)
            res.send(result)
        })

        //get volunteer by email
        app.get('/event', async(req,res)=>{
            const event=req.query.email
            const result= await volunteerCollection.find({email:event}).toArray()
            res.send(result)
            //console.log(result)
        })
        //get delete an event
        app.delete('/deleteEvent/:eventId', async(req,res)=>{
            const eventId=req.params.eventId
            const result= await volunteerCollection.deleteOne({_id:objectId(eventId)})
            res.send(result)

        })

        //get all volunteers
        app.get('/allVolunteers',async(req,res)=>{
            const allVolunteers= await volunteerCollection.find({}).toArray()
            res.send(allVolunteers)
        })

        //delete a volunteer
        app.delete('/deleteVolunteer/:id',async(req,res)=>{
            const id=req.params.id
            const result= await volunteerCollection.deleteOne({_id:objectId(id)})
            res.send(result)
        })

        //create an event
        app.post('/event',async(req,res)=>{
            const event=req.body
            const result= await collection.insertOne(event)
            res.send(result)
        })
     }finally{

     }

}
run().catch(console.dir)



app.get('/',(req,res)=>{
    res.send('Welcome to Volunteer Network')
})

app.listen(port,()=>{
    console.log('Listening on:',port);
})


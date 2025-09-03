const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const tschema = require('./Models/DB')

app.use(cors())
app.use(express.json())

try{
    mongoose.connect('mongodb+srv://root:root@cluster0.hetakbz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
}
catch(err){
    console.error('Error connecting to MongoDB:', err);
}

const uri = 'mongodb+srv://root:root@cluster0.hetakbz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const client = new mongoose.mongo.MongoClient(uri)

app.get('/', (req,res)=>{
    res.send('This is the backend')
})

app.get('./login', (req,res)=>{
    const {uname, password} = req.body
    const db  = client.db('test')
    const collection = db.collection('users')
    const res = collection.findOne({username: uname, password: password})


})

app.get('/gettasks', async (req,res)=>{
    try{
        var r = await tschema.find()
        res.json(r)
    }catch(err){
        console.error('Error in /gettasks:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})


app.post('/addtask', async(req, res)=>{
    try {
        // Check if req.body exists
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Request body is empty' });
        }

        const {task, s2, e2} = req.body;        

        const newTask = new tschema({
            tname: task,
            start: s2,
            end: e2
        });
        
        await newTask.save();
        res.json({ message: 'Task added successfully'});
        
    } catch(err) {
        console.error('Error in /addtask:', err);
        res.status(500).json({ error: 'Internal server error' });
    }   
 
})

const db = client.db('test')
const collection  = db.collection('task_db')

app.post('/deltask', async (req, res)=>{
    try{
        var {selected} = req.body
        if (!selected || selected.length === 0) {
            return res.status(400).json({ error: 'No tasks selected for deletion' });
        }
    const objectIds = selected
      .filter(id => mongoose.Types.ObjectId.isValid(id))
      .map(id => mongoose.Types.ObjectId.createFromHexString(id));        
        //const result = await tschema.deleteMany({_id: {$in: objectIds}})
        //const result = await collection.deleteMany({_id: {$in: objectIds}})
        var i=0;
        while(i<objectIds.length){
            //await collection.deleteOne({_id: objectIds[i]})
            await tschema.findByIdAndDelete(objectIds[i])
            i++;
        }
        //await tschema.findByIdAndDelete(objectIds)
        res.json({message:'Tasks deleted successfully', deletedCount: result.deletedCount})    
    }
    catch(err){
        //return res.status(500).json({error: 'Internal server error'})
        return res.send(err)
    }
})

app.listen(5000,()=>{console.log('Ready for action,')})
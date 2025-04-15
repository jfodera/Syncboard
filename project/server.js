const express = require('express');
const path = require('path');
const session = require('express-session')
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');
const crypto = require('crypto')
const app = express();
const PORT = 3000;
//for BC cypt 1024 iterations of internal key derivation (good balance between time and secureness)
const saltRounds = 10;
const { connectToDb, getDb } = require('./db.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let db;
//calls connect to DB, once that conection is sucessfull getDb assigns db from getDb 
//runs as soon as node server is called 
connectToDb((err) => {
    //calls function in different file 
    if (!err) {
        db = getDb();
        console.log("Successful database connection!")
    }
    else {
        console.log(err);
    }
})


//helper functions 
//assumes only students can log in for right now
async function getAssoCodes(stuRin) {
    //gets entire classes array 
    let classCodes = []
    const rpiClasses = await db.collection('classes').find({}).toArray()
    for (const rpiClass of rpiClasses) {

        for (const rin of rpiClass['studentRINs']) {
            if (rin == stuRin) {
                classCodes.push(rpiClass['crn'])
            }
        }
    }
    return (classCodes)
}





//Main API Functions

app.use(cors({

    //vm: 
    //local 
    origin: 'http://localhost:3000', // React app URL
    credentials: true // Allow cookies (session ID) to be sent
}));


//set up session middleware: 
app.use(session({
    //this key verifies that me (the developer was the one to make the session by storing the secret as a cookei ). Checked each request
    //cookie links the client to the session, session is not a cookie
    //note: this is not the sesion ID, that is a different cookeie 
    //64 char random string
    secret: crypto.randomBytes(32).toString('hex'),
    //prevents rewrites if nothing changes
    resave: false,
    //saves when new session created 
    saveUninitialized: true,
    //cokies being sent are secure as we are on https. 
    //how session ID is trackerd
    cookie: { secure: false }
}));

// *** Session Requests ***/


// Allow requests from reach app 

//updating session status to logged out
app.put('/logout', (req, res) => {
    req.session.user = undefined;
    res.json({ 'message': 'successfully logged out.' });
});

//so react can acsess session data (as it is server side:):
app.get('/session/rin', (req, res) => {

    if (req.session.user != undefined) {
        res.json({
            'sessionMissing': false,
            rin: req.session.user.rin
        });
    } else {
        res.json({ 'sessionMissing': true });
    }


});

//setting the session group ID 
app.put('/session/groupID', (req, res) => {
   //impossible (i think?) 
   if (req.session.user == undefined) {
      res.json({ 'error': 'user is not logged in' });
   }else{
      const groupCont = req.body;
      req.session.user.groupid = groupCont['groupid']
      console.log(req.session.user.groupid)
      
      res.json({ message: 'Group Session assigned' });
   }
})

//getting the session group ID 
app.get('/session/groupID', (req, res) => {
   //impossible (i think?) 
   if (req.session.user == undefined) {
      res.json({ 'error': 'user is not logged in' });
   }else{
      res.json({ groupid : req.session.user.groupid });
   }
})


/*allowing reloads*/
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// get groupid and groupname of user
app.get('/user/teams/:rin', async (req, res) => {
    const rin = parseInt(req.params.rin);
    if (isNaN(rin)) return res.status(400).json({ error: 'Invalid RIN' });
    try {
        const groups = await db.collection('groups').find({students: rin}).project({ groupName:1, groupid: 1, _id: 0}).toArray();
        const groupinfo = groups.map(({ groupName, groupid }) => ({ groupName, groupid }));

        if (!groups) {
            return res.status(404).json({ error: 'Groups not found' });
        }

        res.json(groupinfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch details' });
    }
});

// *** group stuff ***

// get classes from RIN
app.get('/classes/:rin', async (req, res) => {
    const rin = parseInt(req.params.rin);
    if (isNaN(rin)) return res.status(400).json({ error: 'Invalid RIN' });
    try {
        const groups = await db.collection('groups').find({ students: rin }).project({ groupid: 1, groupName: 1, crn: 1, _id: 0 }).toArray();


        const crns = groups.map(item => item.crn);

        //get each course in groups, get the names from the crn
        let classPromises = crns.map(async (crn) => {
            const course = await db.collection('classes').findOne({ crn: crn }, { projection: { className: 1, _id: 0, crn: 1} });
            return course;
        });

        let classes = await Promise.all(classPromises);

      //   const allclasses = classes.map(item => item.className);

        if (!groups) {
            return res.status(404).json({ error: 'Groups not found' });
        }

        res.json(classes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch details' });
    }
});


// get group ID's from RIN
app.get('/groups/fromrin/:rin', async (req, res) => {
   const rin = parseInt(req.params.rin);
   if (isNaN(rin)) return res.status(400).json({ error: 'Invalid RIN' });
   try {
       const groups = await db.collection('groups').find({ students: rin }).project({ groupid: 1, groupName: 1, crn: 1, _id: 0 }).toArray();


       if (!groups) {
           return res.status(404).json({ error: 'Issue Querying groups' });
       }
      //  console.log(groups)

       res.json(groups);
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Failed to fetch details' });
   }
});


// list all groups in a specific section (by crn)
app.get('/groups/all/:crn', async (req, res) => {
    const crn = parseInt(req.params.crn);
    if (isNaN(crn)) {
        return res.status(400).json({ error: 'Invalid CRN' });
    }
    try {
        const groups = await db.collection('groups').find({ crn }).toArray();
        if (groups.length === 0) {
            return res.status(404).json({ error: 'No groups found' });
        }
        res.json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch groups' });
    }
});

// get specific group details
app.get('/groups/:groupid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    if (isNaN(groupid)) return res.status(400).json({ error: 'Invalid group ID' });
    try {
        const group = await db.collection('groups').findOne({ groupid });
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch group details' });
    }
});

// create a new group
app.post('/groups', async (req, res) => {
    const { students, crn } = req.body;
    if (!students || !crn) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const lastGroup = await db.collection('groups').find().sort({ groupid: -1 }).limit(1).toArray();
        const newGroupID = lastGroup.length > 0 ? lastGroup[0].groupid + 1 : 1;
        const newGroup = {
            groupid: newGroupID,
            students,
            crn
        };
        const result = await db.collection('groups').insertOne(newGroup);
        res.json({ message: 'Group created', groupid: newGroupID });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create group' });
    }
});

// update specific group details
app.put('/groups/:groupid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    if (isNaN(groupid)) {
        return res.status(400).json({ error: 'Invalid group ID' });
    }
    const updateFields = req.body;
    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'No fields provided for update' });
    }
    try {
        const result = await db.collection('groups').updateOne(
            { groupid },
            { $set: updateFields }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.json({ message: 'Group updated', updatedFields: updateFields });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update group' });
    }
});

// delete a specific group
app.delete('/groups/:groupid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    if (isNaN(groupid)) {
        return res.status(400).json({ error: 'Invalid group ID' });
    }
    try {
        const result = await db.collection('groups').deleteOne({ groupid });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.json({ message: 'Group deleted successfully', groupid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete group' });
    }
});

// *** profile stuff ***

app.get('/profile', (req, res) => {
    let profiles = [];
    db.collection('profiles')
        .find()
        .forEach(pf => profiles.push(pf))
        .then(() => {
            res.status(200).json(profiles);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

//get user based off rin 
app.get('/profile/:rin', (req, res) => {
    const profileRin = req.params.rin;

    db.collection('profiles')
        .findOne({ rin: profileRin })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

//edit user 
app.put('/profile/:rin', (req, res) => {
    const updatedProfile = req.body;
    delete updatedProfile._id;
    const profileRin = req.params.rin;

    db.collection('profiles')
        .updateOne({ rin: profileRin }, { $set: updatedProfile })
        .then(result => {
            if (result.modifiedCount === 0) {
                return res.status(404).json({ error: 'Profile not found!' });
            }
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Could not update your profile!' });
        })
});

// *** login stuff ***

app.post('/login', async (req, res) => {


    const loginProfile = req.body;
    //  res.json({ message: `Entire DB Populated.` }); 

    db.collection('profiles')
        //works as email is a unique identifier in DAtabase 
        .findOne({ email: loginProfile['email'] })
        .then(async (profile) => { //define what the return in called 
            const match = await bcrypt.compare(loginProfile['password'], profile['password']);
            if (!profile || !match) {
                return res.status(401).json({ error: 'Invalid name or password!' });
            }

            req.session.user = { //stores this is the session of whever requested this
                rin: profile['rin']
            };
            req.session.save();


            //status 200: 'OK' -> Successfull
            res.status(200).json(profile); //sending the profile object returned by the database
        })
        .catch(err => {

            console.error('Database query error:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
})

//allows user to sign up with our page
//automatically checks if user is registered with any classes using classes database 
app.post('/signup', async (req, res) => {
    const newProfile = req.body;

    try {
        //checking if already in DB 
        const emailThere = await db.collection('profiles').findOne({ email: newProfile['email'] })
        const rinThere = await db.collection('profiles').findOne({ rin: newProfile['rin'] })


        if (emailThere != null) {
            res.status(409).json({ error: 'An account with this email already exists' })
        } else if (rinThere != null) {
            res.status(409).json({ error: 'An account with this rin already exists' })
        } else {

            const codes = await getAssoCodes(newProfile['rin'])


            //formatting data right 
            delete newProfile['year']
            delete newProfile['major']
            newProfile['classes'] = codes
            const hashed = await bcrypt.hash(newProfile['password'], saltRounds);
            newProfile['password'] = hashed;


            const profile = await db.collection('profiles').insertOne(newProfile)

            if (!profile.acknowledged) {
                return res.status(401).json({ error: 'Invalid profile!' });
            }
            res.status(200).json(profile);
        }


    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }



})

app.get('/user', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not logged in' });
    }
    res.json(req.session.user);
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ message: "Logged out successfully" });
    });
});

// *** calendar stuff ***

// get all events for a group by groupID
app.get('/calendar/:groupid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    if (isNaN(groupid)) return res.status(400).json({ error: 'Invalid group ID' });
    try {
        const events = await db.collection('calendar').find({ groupid, deleted: false }).toArray();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// get a specific event by groupID and eventID
app.get('/calendar/:groupid/:eventid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    const eventid = parseInt(req.params.eventid);
    if (isNaN(groupid) || isNaN(eventid)) return res.status(400).json({ error: 'Invalid group or event ID' });
    try {
        const event = await db.collection('calendar').findOne({ groupid, eventid, deleted: false });
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch event' });
    }
});

// add new event by groupID
app.post('/calendar/:groupid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    if (isNaN(groupid)) return res.status(400).json({ error: 'Invalid group ID' });
    const { eventname, starttime, endtime, date, allday } = req.body;
    if (!eventname || !date || typeof allday !== 'boolean') {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!allday && (!starttime || !endtime)) {
        return res.status(400).json({ error: 'Start and end time required for non-all-day events' });
    }
    try {
        const lastEvent = await db.collection('calendar').find({ groupid }).sort({ eventid: -1 }).limit(1).toArray();
        const newEventId = lastEvent.length > 0 ? lastEvent[0].eventid + 1 : 1;
        const newEvent = {
            eventname,
            date,
            groupid,
            eventid: newEventId,
            deleted: false,
            allday,
            starttime: allday ? null : starttime,
            endtime: allday ? null : endtime,
        };
        await db.collection('calendar').insertOne(newEvent);
        res.json({ message: 'Event created', eventId: newEventId });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
});


// update an event by groupID and eventID
app.put('/calendar/:groupid/:eventid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    const eventid = parseInt(req.params.eventid);
    if (isNaN(groupid) || isNaN(eventid)) return res.status(400).json({ error: 'Invalid group or event ID' });
    try {
        const updateFields = req.body;
        // If allDay is being updated to true, set starttime and endtime to null
        if (updateFields.allDay === true) {
            updateFields.starttime = null;
            updateFields.endtime = null;
        }
        if (Object.keys(updateFields).length === 0) return res.status(400).json({ error: 'No fields to update' });
        const result = await db.collection('calendar').updateOne(
            { groupid, eventid, deleted: false },
            { $set: updateFields }
        );
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Event not found' });
        res.json({ message: 'Event updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
});

// delete an event
app.delete('/calendar/:groupid/:eventid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    const eventid = parseInt(req.params.eventid);
    if (isNaN(groupid) || isNaN(eventid)) {
        return res.status(400).json({ error: 'Invalid group or event ID' });
    }
    try {
        const result = await db.collection('calendar').deleteOne({ groupid, eventid });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

// *** resources stuff ***

// get all resources for a group by groupID
app.get('/resources/:groupid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    if (isNaN(groupid)) return res.status(400).json({ error: 'Invalid group ID' });
    try {
        const resource = await db.collection('resources').find({ groupid }).toArray();
        res.json(resource);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch resources' });
    }
});

// get a specific resource by groupID and resourceID
app.get('/resources/:groupid/:resourceid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    const resourceid = parseInt(req.params.resourceid);
    if (isNaN(groupid) || isNaN(resourceid)) return res.status(400).json({ error: 'Invalid group or resource ID' });
    try {
        const resource = await db.collection('resources').findOne({ groupid, resourceid });
        if (!resource) return res.status(404).json({ error: 'Event not found' });
        res.json(resource);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch event' });
    }
});

// add new resource by groupID
app.post('/resources/:groupid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    if (isNaN(groupid)) return res.status(400).json({ error: 'Invalid group ID' });
    const { resourcename, link, classid } = req.body;
    if (!resourcename || !link || !classid) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const lastResource = await db.collection('resources').find().sort({ resourceid: -1 }).limit(1).toArray();
        const newResourceId = lastResource.length > 0 ? lastResource[0].resourceid + 1 : 1;
        const newResource = { resourcename, link, classid, groupid, resourceid: newResourceId };
        const result = await db.collection('resources').insertOne(newResource);
        res.json({ message: 'Resource created', resourceid: newResourceId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create resource' });
    }
});


// update an event by groupID and resourceID
app.put('/resources/:groupid/:resourceid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    const resourceid = parseInt(req.params.resourceid);
    if (isNaN(resourceid) || isNaN(resourceid)) return res.status(400).json({ error: 'Invalid group or resource ID' });
    try {
        const updateFields = req.body;
        if (Object.keys(updateFields).length === 0) return res.status(400).json({ error: 'No fields to update' });
        const result = await db.collection('resources').updateOne(
            { groupid, resourceid },
            { $set: updateFields }
        );
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Resource not found' });
        res.json({ message: 'Resource updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update resource' });
    }
});

// delete a resource
app.delete('/resources/:groupid/:resourceid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    const resourceid = parseInt(req.params.resourceid);
    if (isNaN(groupid) || isNaN(resourceid)) {
        return res.status(400).json({ error: 'Invalid group or resource ID' });
    }
    try {
        const result = await db.collection('resources').deleteOne({ groupid, resourceid });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        res.json({ message: 'Resource deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete resource' });
    }
});

// *** task stuff ***

// get all task for a group by groupID
app.get('/tasks/:groupid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    if (isNaN(groupid)) return res.status(400).json({ error: 'Invalid group ID' });
    try {
        const resource = await db.collection('tasks').find({ groupid }).toArray();
        res.json(resource);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// get a specific resource by groupID and taskID
app.get('/tasks/:groupid/:taskid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    const taskid = parseInt(req.params.taskid);
    if (isNaN(groupid) || isNaN(taskid)) return res.status(400).json({ error: 'Invalid group or task ID' });
    try {
        const task = await db.collection('tasks').findOne({ groupid, taskid });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch event' });
    }
});

// add new task by groupID
app.post('/tasks/:groupid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    if (isNaN(groupid)) return res.status(400).json({ error: 'Invalid group ID' });
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const lastTask = await db.collection('tasks').find().sort({ taskid: -1 }).limit(1).toArray();
        const newTaskId = lastTask.length > 0 ? lastTask[0].taskid + 1 : 1;
        const newTask = { task, groupid, taskid: newTaskId, completed: false };
        const result = await db.collection('tasks').insertOne(newTask);
        res.json({ message: 'Task created', taskId: newTaskId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});


// update an event by groupID and taskID
app.put('/tasks/:groupid/:taskid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    const taskid = parseInt(req.params.taskid);
    if (isNaN(groupid) || isNaN(taskid)) return res.status(400).json({ error: 'Invalid group or task ID' });
    try {
        const updateFields = req.body;
        if (Object.keys(updateFields).length === 0) return res.status(400).json({ error: 'No fields to update' });
        const result = await db.collection('tasks').updateOne(
            { groupid, taskid },
            { $set: updateFields }
        );
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// delete a task
app.delete('/tasks/:groupid/:taskid', async (req, res) => {
    const groupid = parseInt(req.params.groupid);
    const taskid = parseInt(req.params.taskid);
    if (isNaN(groupid) || isNaN(taskid)) {
        return res.status(400).json({ error: 'Invalid group or task ID' });
    }
    try {
        const result = await db.collection('tasks').deleteOne({ groupid, taskid });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// allows reload 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
});
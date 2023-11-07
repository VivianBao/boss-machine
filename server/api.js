const express = require('express');
const apiRouter = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = requrie('./db.js');


// validate if minion exists (by id)
app.use('/minions/:minionId', (req, res, next) => {
  const minionId = req.params.minionId;
  const target = getFromDatabaseById('minions', minionId);
  if(target){
    req.minion = target;
    next();
  }else{
    return res.status(404).send('Minion not found');
  }
})

// minions
apiRouter.get('/minions',(req, res, next)=> {
  const all = getAllFromDatabase('minions');
  res.send(all)
})
apiRouter.post('/minions',(req, res, next)=> {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
})
apiRouter.get('/minions/:minionId',(req, res, next)=> {
  res.send(req.minion);
})
apiRouter.put('/minions/:minionId',(req, res, next)=> {
  const newMinion = updateInstanceInDatabase('minions', req.body);
  res.send(newMinion);
})
apiRouter.delete('/minions/:minionId',(req, res,) => {
  const targetMinion = deleteFromDatabasebyId('minions', req.params.minionId);
  if(targetMinion){
    res.status(204).send();
  }
})

// validate if minion exists (by id)
app.use('/ideas/:ideaId', (req, res, next) => {
  const ideaId = req.params.ideaId;
  const target = getFromDatabaseById('ideas', ideaId);
  if(target){
    req.idea = target;
    next();
  }else{
    return res.status(404).send('Idea not found');
  }
})

// ideas
apiRouter.get('/ideas',(req, res, next) => {
  const all = getAllFromDatabase('ideas');
  res.send(all)
})
apiRouter.post('/ideas',(req, res, next)=> {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
})
apiRouter.get('/ideas/:ideaId', (req, res, next)=> {
  res.send(req.minion);
})
apiRouter.put('/ideas/:ideaId', (req, res, next)=> {
  const newIdea = updateInstanceInDatabase('minions', req.body);
  res.send(newIdea);
})
apiRouter.delete('/ideas/:ideaId', (req, res,) => {
  const targetIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if(targetIdea){
    res.status(204).send();
  }
})

// meetings
apiRouter.get('meetings',() => {
  const all = getAllFromDatabase('meetings');
  res.send(all)
})
apiRouter.post('meetings',()=> {
  const newMeeting = createMeeting();
  addToDatabase('ideas', newMeeting);
  res.status(201).send(newMeeting);
})
apiRouter.delete('meetings', (req, res,) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
})

module.exports = apiRouter;

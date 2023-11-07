const express = require('express');
const app = express();
const apiRouter = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  getWorkArrByMinionId,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require('./db.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js')


// validate if minion exists (by id)
apiRouter.param('minionId', (req, res, next, id) => {
  const target = getFromDatabaseById('minions', id);
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
  req.body.salary = Number(req.body.salary)
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
apiRouter.param('workId', (req, res, next, id) => {
  const target = getFromDatabaseById('work', id);
  if(target){
    req.work = target;
    next();
  }else{
    return res.status(404).send('Work not found');
  }
})

// work
apiRouter.get('/minions/:minionId/work',(req, res, next)=> {
  // get works belong to minion
  const minionId = req.minion.id;
  const works = getWorkArrByMinionId('work', minionId)
  if(works){
    res.send(works)
  }
})

apiRouter.post('/minions/:minionId/work',(req, res, next)=> {
  req.body.hours = Number(req.body.hours)
  const newWork = addToDatabase('work', req.body);
  res.status(201).send(newWork);
})

apiRouter.put('/minions/:minionId/work/:workId',(req, res, next)=> {
  const newWork = updateInstanceInDatabase('work', req.body);
  res.send(newWork);
})

apiRouter.delete('/minions/:minionId/work/:workId',(req, res,) => {
  const targetMinion = deleteFromDatabasebyId('work', req.params.workId);
  if(targetMinion){
    res.status(204).send();
  }
})

// validate if minion exists (by id)
apiRouter.param('ideaId', (req, res, next, id) => {
  const target = getFromDatabaseById('ideas', id);
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
apiRouter.post('/ideas',checkMillionDollarIdea, (req, res, next)=> {
  req.body.numWeeks = Number(req.body.numWeeks)
  req.body.weeklyRevenue = Number(req.body.weeklyRevenue);
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
})
apiRouter.get('/ideas/:ideaId', (req, res, next)=> {
  res.send(req.idea);
})
apiRouter.put('/ideas/:ideaId', checkMillionDollarIdea, (req, res, next)=> {
  const newIdea = updateInstanceInDatabase('ideas', req.body);
  res.send(newIdea);
})
apiRouter.delete('/ideas/:ideaId', (req, res,) => {
  const targetIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if(targetIdea){
    res.status(204).send();
  }
})

// meetings
apiRouter.get('/meetings',(req, res) => {
  const all = getAllFromDatabase('meetings');
  res.send(all)
})
apiRouter.post('/meetings',(req, res)=> {
  const newMeeting = createMeeting();
  addToDatabase('meetings', newMeeting);
  res.status(201).send(newMeeting);
})
apiRouter.delete('/meetings', (req, res) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
})

module.exports = apiRouter;

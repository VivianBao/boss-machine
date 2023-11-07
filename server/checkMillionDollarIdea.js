const checkMillionDollarIdea = (req, res, next) => {
  const numWeeks = Number(req.body.numWeeks);
  const weeklyRevenue = Number(req.body.weeklyRevenue);
  if(!numWeeks || !weeklyRevenue){
    return res.status(400).send();
  }
  const sum = numWeeks*weeklyRevenue
  if(!(sum >= 1000000)){
    return res.status(400).send("This idea is not worth 1 million dollars");
  }
  next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;

const checkMillionDollarIdea = (req, res, next) => {
  const numWeeks = Number(req.body.numWeeks);
  const weeklyRevenue = Number(req.body.weeklyRevenue);
  const sum = numWeeks*weeklyRevenue
  if(!sum >= 1000000){
    res.status(400).send("This idea is not worth 1 million dollars")
  }
  next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;

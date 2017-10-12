'use strict'

module.exports.getTrainingPrograms = (req, res, next) => {
  const { Training } = req.app.get('models');
  Training.findAll() // love those built-in Sequelize methods
  .then( (trainings) => {
    let train= trainings.map( (program) =>{
      return program.dataValues; //yank out data values into new array
    });
    res.render('training-progs', train);//show the training programs pug view with this info.
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.getSingleTrainingProgram = (req, res, next)=>{
  const { Training } = req.app.get('models');
  Training.findById(req.params.id)
  .then( (oneTraining) =>{
    let oneT = oneTraining.dataValues;
    res.render('training-prog', {oneT});
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.postTrainingPrograms = (req, res, next) => {
  const { Training } = req.app.get('models');
  Training.create({
    name:req.body.name,
    start_date:req.body.start_date,
    end_date:req.body.end_date,
    max_attendees: req.body.max_attendees,
    createdAt:null,
    updatedAt:null
  })
  .then( (result) => {
     res.status(200).json(result)
  })
  .catch( (err) => {
     res.status(500).json(err)
  })
}

module.exports.renderTrainingCreatePage = (req, res, next) =>{
  res.render('training-create', {});
}
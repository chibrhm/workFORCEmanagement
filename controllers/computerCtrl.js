'use strict'

module.exports.getComputers = (req, res, next) => {
  const { Computer } = req.app.get('models');
  Computer.findAll() // love those built-in Sequelize methods
  .then( (computers) => {
    let comps = computers.map( (comp) => {
      return comp.dataValues;
    });
    // console.log(comps);
    res.render('computers', comps);
  })
  .catch( (err) => {
    next(err); //Ship this nastyness off to our error handler at the bottom of the middleware stack in app.js
  });
};

module.exports.getOneComputer = (req, res, next) => {
  const { Computer } = req.app.get('models');
  Computer.findOne({raw: true, where: {id: req.params.id})
  .then( (show) => {
    res.status(200).json(show)
  })
  .catch( (err) => {
    res.status(500).json({"error": err})
  })
}
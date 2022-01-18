'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    user_id: DataTypes.INTEGER,
    list_id: DataTypes.INTEGER,
    task: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    expected_completion: DataTypes.DATE,
    actual_completion: DataTypes.DATE
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User, {foreignKey: 'user_id'});
    Task.belongsTo(models.List, {foreignKey: 'list_id'});
  };
  return Task;
};

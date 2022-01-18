'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {});
  List.associate = function(models) {
    // associations can be defined here
    List.hasMany(models.Task, {foreignKey: 'list_id'});
    List.belongsTo(models.User, {foreignKey: 'user_id'});
  };
  return List;
};

module.exports = (sequelize, DataTypes) => {
  const Tickets = sequelize.define('Tickets', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    },
    status: {
      type: DataTypes.ENUM('NEW', 'IN_PROGRESS', 'RESOLVED'),
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    timestamps: true
  });
  Tickets.associate = (models) => {
    Tickets.belongsTo(models.Users, {foreignKey: 'userId'})
  }
  return Tickets
}

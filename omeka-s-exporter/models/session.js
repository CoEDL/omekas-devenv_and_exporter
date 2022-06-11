import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class session extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.STRING(190),
      allowNull: false,
      primaryKey: true
    },
    data: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    modified: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'session',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

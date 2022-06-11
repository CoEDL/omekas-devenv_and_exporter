import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class module extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.STRING(190),
      allowNull: false,
      primaryKey: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    version: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'module',
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

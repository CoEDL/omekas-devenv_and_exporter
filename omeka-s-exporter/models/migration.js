import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class migration extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    version: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'migration',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "version" },
        ]
      },
    ]
  });
  }
}

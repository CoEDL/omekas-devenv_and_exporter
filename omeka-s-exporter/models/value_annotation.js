import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class value_annotation extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'resource',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'value_annotation',
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

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class user_setting extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.STRING(190),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "(DC2Type:json_array)"
    }
  }, {
    sequelize,
    tableName: 'user_setting',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "user_id" },
        ]
      },
      {
        name: "IDX_C779A692A76ED395",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}

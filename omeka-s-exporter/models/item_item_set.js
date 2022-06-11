import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class item_item_set extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'item',
        key: 'id'
      }
    },
    item_set_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'item_set',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'item_item_set',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "item_id" },
          { name: "item_set_id" },
        ]
      },
      {
        name: "IDX_6D0C9625126F525E",
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
      {
        name: "IDX_6D0C9625960278D7",
        using: "BTREE",
        fields: [
          { name: "item_set_id" },
        ]
      },
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class item_site extends Model {
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
    site_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'site',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'item_site',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "item_id" },
          { name: "site_id" },
        ]
      },
      {
        name: "IDX_A1734D1F126F525E",
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
      {
        name: "IDX_A1734D1FF6BD1646",
        using: "BTREE",
        fields: [
          { name: "site_id" },
        ]
      },
    ]
  });
  }
}

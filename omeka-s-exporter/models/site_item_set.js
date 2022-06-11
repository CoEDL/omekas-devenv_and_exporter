import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class site_item_set extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    site_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'site',
        key: 'id'
      }
    },
    item_set_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'item_set',
        key: 'id'
      }
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'site_item_set',
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
      {
        name: "UNIQ_D4CE134F6BD1646960278D7",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "site_id" },
          { name: "item_set_id" },
        ]
      },
      {
        name: "IDX_D4CE134F6BD1646",
        using: "BTREE",
        fields: [
          { name: "site_id" },
        ]
      },
      {
        name: "IDX_D4CE134960278D7",
        using: "BTREE",
        fields: [
          { name: "item_set_id" },
        ]
      },
      {
        name: "position",
        using: "BTREE",
        fields: [
          { name: "position" },
        ]
      },
    ]
  });
  }
}

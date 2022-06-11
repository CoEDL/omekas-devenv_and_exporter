import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class site_block_attachment extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    block_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'site_page_block',
        key: 'id'
      }
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'item',
        key: 'id'
      }
    },
    media_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'media',
        key: 'id'
      }
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'site_block_attachment',
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
        name: "IDX_236473FEE9ED820C",
        using: "BTREE",
        fields: [
          { name: "block_id" },
        ]
      },
      {
        name: "IDX_236473FE126F525E",
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
      {
        name: "IDX_236473FEEA9FDD75",
        using: "BTREE",
        fields: [
          { name: "media_id" },
        ]
      },
      {
        name: "block_position",
        using: "BTREE",
        fields: [
          { name: "block_id" },
          { name: "position" },
        ]
      },
    ]
  });
  }
}

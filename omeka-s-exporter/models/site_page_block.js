import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class site_page_block extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    page_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'site_page',
        key: 'id'
      }
    },
    layout: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "(DC2Type:json_array)"
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'site_page_block',
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
        name: "IDX_C593E731C4663E4",
        using: "BTREE",
        fields: [
          { name: "page_id" },
        ]
      },
      {
        name: "page_position",
        using: "BTREE",
        fields: [
          { name: "page_id" },
          { name: "position" },
        ]
      },
    ]
  });
  }
}

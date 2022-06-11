import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class site_setting extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.STRING(190),
      allowNull: false,
      primaryKey: true
    },
    site_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'site',
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
    tableName: 'site_setting',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "site_id" },
        ]
      },
      {
        name: "IDX_64D05A53F6BD1646",
        using: "BTREE",
        fields: [
          { name: "site_id" },
        ]
      },
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class site_permission extends Model {
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.STRING(80),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'site_permission',
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
        name: "UNIQ_C0401D6FF6BD1646A76ED395",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "site_id" },
          { name: "user_id" },
        ]
      },
      {
        name: "IDX_C0401D6FF6BD1646",
        using: "BTREE",
        fields: [
          { name: "site_id" },
        ]
      },
      {
        name: "IDX_C0401D6FA76ED395",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}

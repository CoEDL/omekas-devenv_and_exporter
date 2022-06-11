import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class api_key extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    credential_hash: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    last_ip: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "(DC2Type:ip_address)"
    },
    last_accessed: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'api_key',
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
        name: "IDX_C912ED9D7E3C61F9",
        using: "BTREE",
        fields: [
          { name: "owner_id" },
        ]
      },
    ]
  });
  }
}

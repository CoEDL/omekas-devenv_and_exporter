import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class vocabulary extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    namespace_uri: {
      type: DataTypes.STRING(190),
      allowNull: false,
      unique: "UNIQ_9099C97B9B267FDF"
    },
    prefix: {
      type: DataTypes.STRING(190),
      allowNull: false,
      unique: "UNIQ_9099C97B93B1868E"
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vocabulary',
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
        name: "UNIQ_9099C97B9B267FDF",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "namespace_uri" },
        ]
      },
      {
        name: "UNIQ_9099C97B93B1868E",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "prefix" },
        ]
      },
      {
        name: "IDX_9099C97B7E3C61F9",
        using: "BTREE",
        fields: [
          { name: "owner_id" },
        ]
      },
    ]
  });
  }
}

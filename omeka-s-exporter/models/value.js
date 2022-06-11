import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class value extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    resource_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'resource',
        key: 'id'
      }
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'property',
        key: 'id'
      }
    },
    value_resource_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'resource',
        key: 'id'
      }
    },
    value_annotation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'value_annotation',
        key: 'id'
      },
      unique: "FK_1D7758349B66727E"
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    lang: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    uri: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'value',
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
        name: "UNIQ_1D7758349B66727E",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "value_annotation_id" },
        ]
      },
      {
        name: "IDX_1D77583489329D25",
        using: "BTREE",
        fields: [
          { name: "resource_id" },
        ]
      },
      {
        name: "IDX_1D775834549213EC",
        using: "BTREE",
        fields: [
          { name: "property_id" },
        ]
      },
      {
        name: "IDX_1D7758344BC72506",
        using: "BTREE",
        fields: [
          { name: "value_resource_id" },
        ]
      },
      {
        name: "value",
        using: "BTREE",
        fields: [
          { name: "value", length: 190 },
        ]
      },
      {
        name: "uri",
        using: "BTREE",
        fields: [
          { name: "uri", length: 190 },
        ]
      },
    ]
  });
  }
}

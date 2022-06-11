import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class resource_template extends Model {
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
    resource_class_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'resource_class',
        key: 'id'
      }
    },
    title_property_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'property',
        key: 'id'
      }
    },
    description_property_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'property',
        key: 'id'
      }
    },
    label: {
      type: DataTypes.STRING(190),
      allowNull: false,
      unique: "UNIQ_39ECD52EEA750E8"
    }
  }, {
    sequelize,
    tableName: 'resource_template',
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
        name: "UNIQ_39ECD52EEA750E8",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "label" },
        ]
      },
      {
        name: "IDX_39ECD52E7E3C61F9",
        using: "BTREE",
        fields: [
          { name: "owner_id" },
        ]
      },
      {
        name: "IDX_39ECD52E448CC1BD",
        using: "BTREE",
        fields: [
          { name: "resource_class_id" },
        ]
      },
      {
        name: "IDX_39ECD52E724734A3",
        using: "BTREE",
        fields: [
          { name: "title_property_id" },
        ]
      },
      {
        name: "IDX_39ECD52EB84E0D1D",
        using: "BTREE",
        fields: [
          { name: "description_property_id" },
        ]
      },
    ]
  });
  }
}

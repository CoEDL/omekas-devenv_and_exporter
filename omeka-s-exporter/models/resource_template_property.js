import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class resource_template_property extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    resource_template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'resource_template',
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
    alternate_label: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    alternate_comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    data_type: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "(DC2Type:json_array)"
    },
    is_required: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'resource_template_property',
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
        name: "UNIQ_4689E2F116131EA549213EC",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "resource_template_id" },
          { name: "property_id" },
        ]
      },
      {
        name: "IDX_4689E2F116131EA",
        using: "BTREE",
        fields: [
          { name: "resource_template_id" },
        ]
      },
      {
        name: "IDX_4689E2F1549213EC",
        using: "BTREE",
        fields: [
          { name: "property_id" },
        ]
      },
    ]
  });
  }
}

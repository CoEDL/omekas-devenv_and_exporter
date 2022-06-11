import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class resource extends Model {
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
    resource_template_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'resource_template',
        key: 'id'
      }
    },
    thumbnail_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'asset',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    modified: {
      type: DataTypes.DATE,
      allowNull: true
    },
    resource_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'resource',
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
        name: "IDX_BC91F4167E3C61F9",
        using: "BTREE",
        fields: [
          { name: "owner_id" },
        ]
      },
      {
        name: "IDX_BC91F416448CC1BD",
        using: "BTREE",
        fields: [
          { name: "resource_class_id" },
        ]
      },
      {
        name: "IDX_BC91F41616131EA",
        using: "BTREE",
        fields: [
          { name: "resource_template_id" },
        ]
      },
      {
        name: "IDX_BC91F416FDFF2E92",
        using: "BTREE",
        fields: [
          { name: "thumbnail_id" },
        ]
      },
    ]
  });
  }
}

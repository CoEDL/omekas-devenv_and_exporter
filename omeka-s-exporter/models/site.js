import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class site extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    thumbnail_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'asset',
        key: 'id'
      }
    },
    homepage_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'site_page',
        key: 'id'
      },
      unique: "FK_694309E4571EDDA"
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    slug: {
      type: DataTypes.STRING(190),
      allowNull: false,
      unique: "UNIQ_694309E4989D9B62"
    },
    theme: {
      type: DataTypes.STRING(190),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(190),
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    navigation: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "(DC2Type:json_array)"
    },
    item_pool: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "(DC2Type:json_array)"
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    modified: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    assign_new_items: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'site',
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
        name: "UNIQ_694309E4989D9B62",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "slug" },
        ]
      },
      {
        name: "UNIQ_694309E4571EDDA",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "homepage_id" },
        ]
      },
      {
        name: "IDX_694309E4FDFF2E92",
        using: "BTREE",
        fields: [
          { name: "thumbnail_id" },
        ]
      },
      {
        name: "IDX_694309E47E3C61F9",
        using: "BTREE",
        fields: [
          { name: "owner_id" },
        ]
      },
    ]
  });
  }
}

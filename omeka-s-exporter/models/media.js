import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class media extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'resource',
        key: 'id'
      }
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'item',
        key: 'id'
      }
    },
    ingester: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    renderer: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "(DC2Type:json_array)"
    },
    source: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    media_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    storage_id: {
      type: DataTypes.STRING(190),
      allowNull: true,
      unique: "UNIQ_6A2CA10C5CC5DB90"
    },
    extension: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sha256: {
      type: DataTypes.CHAR(64),
      allowNull: true
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    has_original: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    has_thumbnails: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lang: {
      type: DataTypes.STRING(190),
      allowNull: true
    },
    alt_text: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'media',
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
        name: "UNIQ_6A2CA10C5CC5DB90",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "storage_id" },
        ]
      },
      {
        name: "IDX_6A2CA10C126F525E",
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
      {
        name: "item_position",
        using: "BTREE",
        fields: [
          { name: "item_id" },
          { name: "position" },
        ]
      },
    ]
  });
  }
}

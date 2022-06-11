import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class asset extends Model {
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    media_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    storage_id: {
      type: DataTypes.STRING(190),
      allowNull: false,
      unique: "UNIQ_2AF5A5C5CC5DB90"
    },
    extension: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    alt_text: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'asset',
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
        name: "UNIQ_2AF5A5C5CC5DB90",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "storage_id" },
        ]
      },
      {
        name: "IDX_2AF5A5C7E3C61F9",
        using: "BTREE",
        fields: [
          { name: "owner_id" },
        ]
      },
    ]
  });
  }
}

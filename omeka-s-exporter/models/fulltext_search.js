import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class fulltext_search extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    resource: {
      type: DataTypes.STRING(190),
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
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'fulltext_search',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "resource" },
        ]
      },
      {
        name: "IDX_AA31FE4A7E3C61F9",
        using: "BTREE",
        fields: [
          { name: "owner_id" },
        ]
      },
      {
        name: "IDX_AA31FE4A2B36786B3B8BA7C7",
        type: "FULLTEXT",
        fields: [
          { name: "title" },
          { name: "text" },
        ]
      },
    ]
  });
  }
}

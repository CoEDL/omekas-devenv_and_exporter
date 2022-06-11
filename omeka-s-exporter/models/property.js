import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class property extends Model {
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
    vocabulary_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vocabulary',
        key: 'id'
      }
    },
    local_name: {
      type: DataTypes.STRING(190),
      allowNull: false
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
    tableName: 'property',
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
        name: "UNIQ_8BF21CDEAD0E05F6623C14D5",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "vocabulary_id" },
          { name: "local_name" },
        ]
      },
      {
        name: "IDX_8BF21CDE7E3C61F9",
        using: "BTREE",
        fields: [
          { name: "owner_id" },
        ]
      },
      {
        name: "IDX_8BF21CDEAD0E05F6",
        using: "BTREE",
        fields: [
          { name: "vocabulary_id" },
        ]
      },
    ]
  });
  }
}

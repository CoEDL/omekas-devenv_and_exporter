import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class site_page extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    site_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'site',
        key: 'id'
      }
    },
    slug: {
      type: DataTypes.STRING(190),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(190),
      allowNull: false
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
    }
  }, {
    sequelize,
    tableName: 'site_page',
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
        name: "UNIQ_2F900BD9F6BD1646989D9B62",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "site_id" },
          { name: "slug" },
        ]
      },
      {
        name: "IDX_2F900BD9F6BD1646",
        using: "BTREE",
        fields: [
          { name: "site_id" },
        ]
      },
    ]
  });
  }
}

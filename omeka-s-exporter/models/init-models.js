import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _api_key from "./api_key.js";
import _asset from "./asset.js";
import _fulltext_search from "./fulltext_search.js";
import _item from "./item.js";
import _item_item_set from "./item_item_set.js";
import _item_set from "./item_set.js";
import _item_site from "./item_site.js";
import _job from "./job.js";
import _media from "./media.js";
import _migration from "./migration.js";
import _module from "./module.js";
import _password_creation from "./password_creation.js";
import _property from "./property.js";
import _resource from "./resource.js";
import _resource_class from "./resource_class.js";
import _resource_template from "./resource_template.js";
import _resource_template_property from "./resource_template_property.js";
import _session from "./session.js";
import _setting from "./setting.js";
import _site from "./site.js";
import _site_block_attachment from "./site_block_attachment.js";
import _site_item_set from "./site_item_set.js";
import _site_page from "./site_page.js";
import _site_page_block from "./site_page_block.js";
import _site_permission from "./site_permission.js";
import _site_setting from "./site_setting.js";
import _user from "./user.js";
import _user_setting from "./user_setting.js";
import _value from "./value.js";
import _value_annotation from "./value_annotation.js";
import _vocabulary from "./vocabulary.js";

export default function initModels(sequelize) {
    const api_key = _api_key.init(sequelize, DataTypes);
    const asset = _asset.init(sequelize, DataTypes);
    const fulltext_search = _fulltext_search.init(sequelize, DataTypes);
    const item = _item.init(sequelize, DataTypes);
    const item_item_set = _item_item_set.init(sequelize, DataTypes);
    const item_set = _item_set.init(sequelize, DataTypes);
    const item_site = _item_site.init(sequelize, DataTypes);
    const job = _job.init(sequelize, DataTypes);
    const media = _media.init(sequelize, DataTypes);
    const migration = _migration.init(sequelize, DataTypes);
    const module = _module.init(sequelize, DataTypes);
    const password_creation = _password_creation.init(sequelize, DataTypes);
    const property = _property.init(sequelize, DataTypes);
    const resource = _resource.init(sequelize, DataTypes);
    const resource_class = _resource_class.init(sequelize, DataTypes);
    const resource_template = _resource_template.init(sequelize, DataTypes);
    const resource_template_property = _resource_template_property.init(sequelize, DataTypes);
    const session = _session.init(sequelize, DataTypes);
    const setting = _setting.init(sequelize, DataTypes);
    const site = _site.init(sequelize, DataTypes);
    const site_block_attachment = _site_block_attachment.init(sequelize, DataTypes);
    const site_item_set = _site_item_set.init(sequelize, DataTypes);
    const site_page = _site_page.init(sequelize, DataTypes);
    const site_page_block = _site_page_block.init(sequelize, DataTypes);
    const site_permission = _site_permission.init(sequelize, DataTypes);
    const site_setting = _site_setting.init(sequelize, DataTypes);
    const user = _user.init(sequelize, DataTypes);
    const user_setting = _user_setting.init(sequelize, DataTypes);
    const value = _value.init(sequelize, DataTypes);
    const value_annotation = _value_annotation.init(sequelize, DataTypes);
    const vocabulary = _vocabulary.init(sequelize, DataTypes);

    item.belongsToMany(item_set, {
        as: "item_set_id_item_sets",
        through: item_item_set,
        foreignKey: "item_id",
        otherKey: "item_set_id",
    });
    item.belongsToMany(site, {
        as: "site_id_sites",
        through: item_site,
        foreignKey: "item_id",
        otherKey: "site_id",
    });
    item_set.belongsToMany(item, {
        as: "item_id_items",
        through: item_item_set,
        foreignKey: "item_set_id",
        otherKey: "item_id",
    });
    site.belongsToMany(item, {
        as: "item_id_item_item_sites",
        through: item_site,
        foreignKey: "site_id",
        otherKey: "item_id",
    });
    resource.belongsTo(asset, { as: "thumbnail", foreignKey: "thumbnail_id" });
    asset.hasMany(resource, { as: "resources", foreignKey: "thumbnail_id" });
    site.belongsTo(asset, { as: "thumbnail", foreignKey: "thumbnail_id" });
    asset.hasMany(site, { as: "sites", foreignKey: "thumbnail_id" });
    item_item_set.belongsTo(item, { as: "item", foreignKey: "item_id" });
    item.hasMany(item_item_set, { as: "item_item_sets", foreignKey: "item_id" });
    item_site.belongsTo(item, { as: "item", foreignKey: "item_id" });
    item.hasMany(item_site, { as: "item_sites", foreignKey: "item_id" });
    media.belongsTo(item, { as: "item", foreignKey: "item_id" });
    item.hasMany(media, { as: "media", foreignKey: "item_id" });
    site_block_attachment.belongsTo(item, { as: "item", foreignKey: "item_id" });
    item.hasMany(site_block_attachment, { as: "site_block_attachments", foreignKey: "item_id" });
    item_item_set.belongsTo(item_set, { as: "item_set", foreignKey: "item_set_id" });
    item_set.hasMany(item_item_set, { as: "item_item_sets", foreignKey: "item_set_id" });
    site_item_set.belongsTo(item_set, { as: "item_set", foreignKey: "item_set_id" });
    item_set.hasMany(site_item_set, { as: "site_item_sets", foreignKey: "item_set_id" });
    site_block_attachment.belongsTo(media, { as: "medium", foreignKey: "media_id" });
    media.hasMany(site_block_attachment, { as: "site_block_attachments", foreignKey: "media_id" });
    resource_template.belongsTo(property, {
        as: "title_property",
        foreignKey: "title_property_id",
    });
    property.hasMany(resource_template, {
        as: "resource_templates",
        foreignKey: "title_property_id",
    });
    resource_template.belongsTo(property, {
        as: "description_property",
        foreignKey: "description_property_id",
    });
    property.hasMany(resource_template, {
        as: "description_property_resource_templates",
        foreignKey: "description_property_id",
    });
    resource_template_property.belongsTo(property, { as: "property", foreignKey: "property_id" });
    property.hasMany(resource_template_property, {
        as: "resource_template_properties",
        foreignKey: "property_id",
    });
    value.belongsTo(property, { as: "property", foreignKey: "property_id" });
    property.hasMany(value, { as: "values", foreignKey: "property_id" });
    item.belongsTo(resource, { as: "id_resource", foreignKey: "id" });
    resource.hasOne(item, { as: "item", foreignKey: "id" });
    item_set.belongsTo(resource, { as: "id_resource", foreignKey: "id" });
    resource.hasOne(item_set, { as: "item_set", foreignKey: "id" });
    media.belongsTo(resource, { as: "id_resource", foreignKey: "id" });
    resource.hasOne(media, { as: "medium", foreignKey: "id" });
    value.belongsTo(resource, { as: "resource", foreignKey: "resource_id" });
    resource.hasMany(value, { as: "values", foreignKey: "resource_id" });
    value.belongsTo(resource, { as: "value_resource", foreignKey: "value_resource_id" });
    resource.hasMany(value, { as: "value_resource_values", foreignKey: "value_resource_id" });
    value_annotation.belongsTo(resource, { as: "id_resource", foreignKey: "id" });
    resource.hasOne(value_annotation, { as: "value_annotation", foreignKey: "id" });
    resource.belongsTo(resource_class, { as: "resource_class", foreignKey: "resource_class_id" });
    resource_class.hasMany(resource, { as: "resources", foreignKey: "resource_class_id" });
    resource_template.belongsTo(resource_class, {
        as: "resource_class",
        foreignKey: "resource_class_id",
    });
    resource_class.hasMany(resource_template, {
        as: "resource_templates",
        foreignKey: "resource_class_id",
    });
    resource.belongsTo(resource_template, {
        as: "resource_template",
        foreignKey: "resource_template_id",
    });
    resource_template.hasMany(resource, { as: "resources", foreignKey: "resource_template_id" });
    resource_template_property.belongsTo(resource_template, {
        as: "resource_template",
        foreignKey: "resource_template_id",
    });
    resource_template.hasMany(resource_template_property, {
        as: "resource_template_properties",
        foreignKey: "resource_template_id",
    });
    item_site.belongsTo(site, { as: "site", foreignKey: "site_id" });
    site.hasMany(item_site, { as: "item_sites", foreignKey: "site_id" });
    site_item_set.belongsTo(site, { as: "site", foreignKey: "site_id" });
    site.hasMany(site_item_set, { as: "site_item_sets", foreignKey: "site_id" });
    site_page.belongsTo(site, { as: "site_site", foreignKey: "site_id" });
    site.hasMany(site_page, { as: "site_pages", foreignKey: "site_id" });
    site_permission.belongsTo(site, { as: "site", foreignKey: "site_id" });
    site.hasMany(site_permission, { as: "site_permissions", foreignKey: "site_id" });
    site_setting.belongsTo(site, { as: "site", foreignKey: "site_id" });
    site.hasMany(site_setting, { as: "site_settings", foreignKey: "site_id" });
    site.belongsTo(site_page, { as: "homepage", foreignKey: "homepage_id" });
    site_page.hasOne(site, { as: "site", foreignKey: "homepage_id" });
    site_page_block.belongsTo(site_page, { as: "page", foreignKey: "page_id" });
    site_page.hasMany(site_page_block, { as: "site_page_blocks", foreignKey: "page_id" });
    site_block_attachment.belongsTo(site_page_block, { as: "block", foreignKey: "block_id" });
    site_page_block.hasMany(site_block_attachment, {
        as: "site_block_attachments",
        foreignKey: "block_id",
    });
    api_key.belongsTo(user, { as: "owner", foreignKey: "owner_id" });
    user.hasMany(api_key, { as: "api_keys", foreignKey: "owner_id" });
    asset.belongsTo(user, { as: "owner", foreignKey: "owner_id" });
    user.hasMany(asset, { as: "assets", foreignKey: "owner_id" });
    fulltext_search.belongsTo(user, { as: "owner", foreignKey: "owner_id" });
    user.hasMany(fulltext_search, { as: "fulltext_searches", foreignKey: "owner_id" });
    job.belongsTo(user, { as: "owner", foreignKey: "owner_id" });
    user.hasMany(job, { as: "jobs", foreignKey: "owner_id" });
    password_creation.belongsTo(user, { as: "user", foreignKey: "user_id" });
    user.hasOne(password_creation, { as: "password_creation", foreignKey: "user_id" });
    property.belongsTo(user, { as: "owner", foreignKey: "owner_id" });
    user.hasMany(property, { as: "properties", foreignKey: "owner_id" });
    resource.belongsTo(user, { as: "owner", foreignKey: "owner_id" });
    user.hasMany(resource, { as: "resources", foreignKey: "owner_id" });
    resource_class.belongsTo(user, { as: "owner", foreignKey: "owner_id" });
    user.hasMany(resource_class, { as: "resource_classes", foreignKey: "owner_id" });
    resource_template.belongsTo(user, { as: "owner", foreignKey: "owner_id" });
    user.hasMany(resource_template, { as: "resource_templates", foreignKey: "owner_id" });
    site.belongsTo(user, { as: "owner", foreignKey: "owner_id" });
    user.hasMany(site, { as: "sites", foreignKey: "owner_id" });
    site_permission.belongsTo(user, { as: "user", foreignKey: "user_id" });
    user.hasMany(site_permission, { as: "site_permissions", foreignKey: "user_id" });
    user_setting.belongsTo(user, { as: "user", foreignKey: "user_id" });
    user.hasMany(user_setting, { as: "user_settings", foreignKey: "user_id" });
    vocabulary.belongsTo(user, { as: "owner", foreignKey: "owner_id" });
    user.hasMany(vocabulary, { as: "vocabularies", foreignKey: "owner_id" });
    value.belongsTo(value_annotation, {
        as: "value_annotation",
        foreignKey: "value_annotation_id",
    });
    value_annotation.hasOne(value, { as: "value", foreignKey: "value_annotation_id" });
    property.belongsTo(vocabulary, { as: "vocabulary", foreignKey: "vocabulary_id" });
    vocabulary.hasMany(property, { as: "properties", foreignKey: "vocabulary_id" });
    resource_class.belongsTo(vocabulary, { as: "vocabulary", foreignKey: "vocabulary_id" });
    vocabulary.hasMany(resource_class, { as: "resource_classes", foreignKey: "vocabulary_id" });

    return {
        api_key,
        asset,
        fulltext_search,
        item,
        item_item_set,
        item_set,
        item_site,
        job,
        media,
        migration,
        module,
        password_creation,
        property,
        resource,
        resource_class,
        resource_template,
        resource_template_property,
        session,
        setting,
        site,
        site_block_attachment,
        site_item_set,
        site_page,
        site_page_block,
        site_permission,
        site_setting,
        user,
        user_setting,
        value,
        value_annotation,
        vocabulary,
    };
}

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sk2oejsii4t3mze")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wv2vzzha",
    "name": "user_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sk2oejsii4t3mze")

  // remove
  collection.schema.removeField("wv2vzzha")

  return dao.saveCollection(collection)
})

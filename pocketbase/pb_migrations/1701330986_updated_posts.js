/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sk2oejsii4t3mze")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0pat7fmp",
    "name": "source_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "dahw7loo9kbuowc",
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
  collection.schema.removeField("0pat7fmp")

  return dao.saveCollection(collection)
})

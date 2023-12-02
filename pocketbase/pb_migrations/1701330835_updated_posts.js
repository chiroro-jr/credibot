/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sk2oejsii4t3mze")

  // remove
  collection.schema.removeField("lzbxajhd")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sk2oejsii4t3mze")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lzbxajhd",
    "name": "credibility_class",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "dahw7loo9kbuowc",
    "created": "2023-11-30 07:48:11.463Z",
    "updated": "2023-11-30 07:48:11.463Z",
    "name": "sources",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dmcdrv0x",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 50,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dahw7loo9kbuowc");

  return dao.deleteCollection(collection);
})

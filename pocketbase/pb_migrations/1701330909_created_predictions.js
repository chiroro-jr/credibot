/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "lxa5ufd5db25a2u",
    "created": "2023-11-30 07:55:09.924Z",
    "updated": "2023-11-30 07:55:09.924Z",
    "name": "predictions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "msxj42ir",
        "name": "classification",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ix0k0rb4",
        "name": "prob_for",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
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
  const collection = dao.findCollectionByNameOrId("lxa5ufd5db25a2u");

  return dao.deleteCollection(collection);
})

# MongoDB $in operator with null values
This repository demonstrates a common issue when using the `$in` operator in MongoDB queries with arrays containing `null` values.

The problem arises because MongoDB's `$in` operator does not correctly handle `null` values within the array.  This results in unexpected behavior, often returning an empty result set even when documents with matching `null` values exist.

This repository provides examples of the incorrect usage and the correct solution to handle `null` values gracefully.

## Bug Report
The original query uses the `$in` operator with an array including `null`:
```javascript
db.collection.find({ field: { $in: [1, 2, null] } });
```
When the `field` in a document is `null`, the query should return that document. However, due to the limitation of the `$in` operator, this query returns an empty result set.

## Solution
The solution involves separate queries for `null` and the other values. This allows the correct retrieval of documents that contains `null` in the specified field.

```javascript
// Separate queries to handle null and other values
db.collection.find({ field: { $in: [1, 2] } }).toArray().then(result1 => {
  db.collection.find({ field: null }).toArray().then(result2 => {
    console.log([...result1, ...result2]);
  });
});
```
```javascript
// Correct usage using separate queries for null and other values
db.collection.find({ field: { $in: [1, 2] } }).toArray().then(result1 => {
  db.collection.find({ field: null }).toArray().then(result2 => {
    console.log([...result1, ...result2]);
  });
});
```
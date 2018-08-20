# Comparison of Promises and Async/Await

To run:

```javascript
npm install
npm test
```

## Why Async/Await?

1. More sequential code.
2. Opportunity for less deeply nested code structures.
3. In theory, the Javascript engine, if multi-threaded, knows when your thread can be suspended (at "await" statements) and awakened when its result is ready.
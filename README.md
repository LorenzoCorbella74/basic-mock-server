# Basic mock server

Just map a json file to a request path in `mappings.mjs`. 

```typescript
 const mappings = {
   // Default is GET
   "/api/users_DEFAULT": "/mocks/default.json",
   // or explicit HTTP verb and corrispondive file
  "/api/users": {
    "method": "GET",
    "file": "/mocks/file1.json"
  },
  "/api/users_post": {
    "method": "POST",
    "file": "/mocks/file2.json"
  },
};
```

## Features
- [x] The basic mock server manages all type of request (get, post, delete, patch, option) removing query parameters
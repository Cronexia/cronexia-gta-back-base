# 📝🔧 nest-cli.json manipulations

```json
// 🚨 No comments in original JSON format
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "builder": "swc",
    "deleteOutDir": true,
    "plugins": [
      {
        "name": "@nestjs/graphql",
        "options": {
          "introspectComments": true
        }
      },
      {
        "name": "@nestjs/swagger",
        "options": {
          "classValidatorShim": true,
          "introspectComments": true
        }
      }
    ],
    // * Desactivate type checking after compling, which takes ~5 seconds will all files
    //      And basically is the linter warning
    // "typeCheck": true
  }
}
```

# 📝🔧 tsconfig.json manipulations

```json
// 🚨 No comments in original JSON format
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    // "target": "ES2021",
    "target": "esnext",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
}
```

---

## target

[tsconfig > target](https://www.typescriptlang.org/tsconfig/#target)

Modern browsers support all ES6 features, so ES6 is a good choice. You might choose to set a lower target if your code is deployed to older environments, or a higher target if your code is guaranteed to run in newer environments.

The special **ESNext** value refers to the highest version your version of TypeScript supports. This setting should be used with caution, since it doesn’t mean the same thing between different TypeScript versions and can make upgrades less predictable.

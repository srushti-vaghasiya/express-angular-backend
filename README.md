1. Generate a Migration
   Generates a new migration file inside the src/migrations folder.

```bash
 npm run migration:generate -- src/migrations/create-user
```

2. Run Migrations

```bash
npm run migration:run
```

3. Revert Last Migration

```bash
npm run migration:revert
```

4. Create migration

```bash
npm run migration:create -- ./src/migrations/add-admin-user
```

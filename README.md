1. Clone repository

   ```bash
   git clone --depth 1 https://github.com/slimani-amine/softy-editor-backend e-ditor-backend
   ```

   ```bash
   cd e-ditor-backend/
   cp .env.example .env
   ```

2. Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`
   Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

3. Run additional container:

   ```bash
   docker compose up -d 
   ```

4. Install dependency

   ```bash
   npm install
   ```

5. Run migrations

   ```bash
   npm run migration:run
   ```

6. Run seeds

   ```bash
   npm run seed:run:relational
   ```

7. Run app in dev mode

   ```bash
   npm run start:dev
   ```

8. Open <http://localhost:8000>
   Open <http://localhost:1080> for request emails

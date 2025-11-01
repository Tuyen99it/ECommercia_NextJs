All commands used in this projects:
1. Setup
- install NodeJs
- install bun for window: powershell -c "irm bun.sh/install.ps1|iex"
- check nodejs version: node --version
- check bun version: bunx --version
- check nextjs version: bunx create-next-app@latest --version
- create next js app: bunx create-next-app@15.2.4
+ name projects
+ select TS: Y
... → yes
+ custom alias → no
- enter project folder: cd name_project
- edit package.json:
    + devDependencies:{
        ..
        " check tailwindcss verion;
        ..
    }
bun.block: block for bun package mamager
- run project: bun run dev
- install Shadcn/UI: https://ui.shadcn.com/docs/installation
+ check shadcn ui version: bunx --bun shadcn@latest --version
+ install shadcn: bunx --bun shadcn@2.4.0-canary.17 init
+ check file: utils.ts → cn funtion
- run project: bun run dev
- add componets to project: bunx --bun shadcn@2.4.0-canary add --all
2. custom:
- Css
- HTml
- Github
3. Homepage
- export defaut Page: using to inport as a page;
4, Payload integration
- Choose a database
+ Mongo database
+ PostgreSQL
+ SQL lite
- Why choose MongoDb
+ Flexible, schemaless structure
+ Greate for nested + relational data
+ Works out of the box with Payload
+ Easy and Free clound histing via Atlas
- Integrate Payload
+ run the configuration CLI
+ add a collection schema
- Install payload:   
- Move all folder in app to app/(app)
- Connect to MongoDB:
+ rerun: bunx create-payload-app@latest --use-bun
+ Choose MongoDb
+ Config MongoDB connection string: MongoDb Atlas → Cluster → connect → MongoDB for Vscode → copy connectionstring → Parse to terminal
5. Search filter
- Enhance "Categories" collection
- Add subcategor, color, slug..
- Create "Search Filter" component
+ Display each Categories
+ Display subcategories 
- Push to github
- fresh migration database ( drop database ): bun run payload migrate:fresh
6. Finish Categories
- seeding Categories
+ Create a seed script: bun run src/seed.ts
Meet issue:
PS C:\Users\nguye\Documents\Multi_Ecommercial_Next_JS\ecommercial_nextjs> bun run src/seed.ts
[22:31:27] WARN: No email adapter provided. Email will be written to console. More info at https://payloadcms.com/docs/email/overview.
 5 | import { createOperation } from '../create.js';
 6 | export async function createLocal(payload, options) {
 7 |     const { collection: collectionSlug, data, depth, disableTransaction, disableVerificationEmail, draft, duplicateFromID, file, filePath, overrideAccess = true, overwriteExistingFiles = false, populate, select, showHiddenFields } = options;
 8 |     const collection = payload.collections[collectionSlug];
 9 |     if (!collection) {
10 |         throw new APIError(`The collection with slug ${String(collectionSlug)} can't be found. Create Operation.`);
                   ^
APIError: The collection with slug undefined can't be found. Create Operation.
       data: null,
 isOperational: true,
   isPublic: false,
     status: 500,

      at createLocal (C:\Users\nguye\Documents\Multi_Ecommercial_Next_JS\ecommercial_nextjs\node_modules\payload\dist\collections\operations\local\create.js:10:15)
      at createLocal (C:\Users\nguye\Documents\Multi_Ecommercial_Next_JS\ecommercial_nextjs\node_modules\payload\dist\collections\operations\local\create.js:6:35)
      at create (C:\Users\nguye\Documents\Multi_Ecommercial_Next_JS\ecommercial_nextjs\node_modules\payload\dist\index.js:102:23)
      at <anonymous> (C:\Users\nguye\Documents\Multi_Ecommercial_Next_JS\ecommercial_nextjs\src\seed.ts:142:46)

Bun v1.3.1 (Windows x64)
- Result TS issue
- drop database: bun run payload migrate:fresh
+ add new package.json commands
- Resolve TS issues: CustomCategory
+ Create a " CustomCategory" type
7. Trpc intergration
- setup TRPC
+ Basic router
+ Client-side fetcher
+ server-side fetcher- Texplore new syntax
- Add " categoriesRouter"
+ Prefetch categories in " Layout.tsx"
+ Client-site fetch c categories in "  categories-sidebar.text"
+ Infer Trpc types
- Push to Github
7.1 Trpc setup
- install Trpc: https://trpc.io/docs/client/tanstack-react-query/server-components
- install with bun: bun add @trpc/server @trpc/client @trpc/tanstack-react-query @tanstack/react-query@latest zod client-only server-only
- Create a tRPC router: app/trpc/init.ts, app/trpc/_app.ts, app/trpc/router.ts
- create a query Client Factory: app/trpc/query-clietn.ts
- install superjson: bun add superjson
- Create a tRPC client for Client Components: app/trpc/client.ts
- Create NEXT_PUBLIC_APP_URL at client.ts
- Mount the provider in the root of your application (e.g. app/layout.tsx when using Next.js).
  <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TRPCReactProvider>
          {children}
        </TRPCReactProvider>

  </body>
- Create a tRPC caller for Server Components: trpc/server.tsx
- Using your API
7.2 Add categories Router
- Modules/Categories/Server/Procedures.ts
- Common issue:It doesn't work! I'm getting any everywhere, check: https://trpc.io/docs/faq
fix: .vscode/settings.json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
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
- Install payload: bunx create-payload-app@latest --use-bun
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


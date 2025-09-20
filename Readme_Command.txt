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

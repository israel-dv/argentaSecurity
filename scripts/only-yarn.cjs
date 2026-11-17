// Bloquea `npm install` / `pnpm install`: este proyecto usa solo yarn.
const agent = process.env.npm_config_user_agent || '';
if (!agent.startsWith('yarn/')) {
  console.error('\nEste proyecto usa yarn. Ejecuta `yarn install`.\n');
  process.exit(1);
}

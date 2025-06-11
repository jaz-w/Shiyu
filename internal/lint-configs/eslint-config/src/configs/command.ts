import createCommand from 'eslint-plugin-command/dist/config.mjs'

export async function command() {
  return [{ ...createCommand() }]
}

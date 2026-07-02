import { spawn } from 'node:child_process'

const apps = [
  ['super-admin', 'frontend-super-admin', '5173'],
  ['org-admin', 'frontend-org-admin', '5174'],
  ['user', 'frontend-user', '5175'],
]

const children = apps.map(([name, directory, port]) => {
  const child = spawn(
    'npm',
    ['--prefix', directory, 'run', 'dev', '--', '--host', '0.0.0.0', '--port', port],
    { shell: true }
  )

  child.stdout.on('data', (data) => process.stdout.write(`[${name}] ${data}`))
  child.stderr.on('data', (data) => process.stderr.write(`[${name}] ${data}`))
  
  child.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`[${name}] exited with code ${code}`)
    }
  })

  return child
})

const stopChildren = () => {
  for (const child of children) {
    child.kill()
  }
}

process.on('SIGINT', () => {
  stopChildren()
  process.exit(0)
})

process.on('SIGTERM', () => {
  stopChildren()
  process.exit(0)
})
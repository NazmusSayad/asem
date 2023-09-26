const path = require('path')
const prompt = require('prompts')
const shelljs = require('shelljs')
const vbsPath = path.join(__dirname, './vbs.vbs')

function runEmulator(name) {
  console.log('Opening:', name)
  shelljs.exec(`"${vbsPath}" ${name}`)
}

;(async () => {
  const { stdout } = shelljs.exec('emulator -list-avds', {
    silent: true,
    async: false,
  })

  const emulators = stdout
    .trim()
    .split('\n')
    .map((a) => a.trim())

  if (emulators.length === 0) {
    console.error('No emulator found!')
    return process.exit(1)
  }

  if (emulators.length === 1) {
    return runEmulator(emulators[0])
  }

  const result = await prompt({
    name: 'name',
    type: 'select',
    message: 'Choose device',
    choices: emulators.map((emulator) => ({
      title: emulator,
      value: emulator,
    })),
  })

  runEmulator(result.name)
})()

const path = require('path')
const prompt = require('prompts')
const shelljs = require('shelljs')
const vbsPath = path.join(__dirname, './vbs.vbs')

;(async () => {
  const { stdout } = shelljs.exec('emulator -list-avds', {
    silent: true,
    async: false,
  })

  const emulators = stdout
    .trim()
    .split('\n')
    .map((a) => a.trim())

  console.clear()
  const result = await prompt({
    name: 'name',
    type: 'select',
    message: 'Choose device',
    choices: emulators.map((emulator) => ({
      title: emulator,
      value: emulator,
    })),
  })

  console.log('Opening', result.name)
  shelljs.exec(`"${vbsPath}" ${result.name}`)
})()

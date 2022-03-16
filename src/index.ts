import { exportVariable, getBooleanInput, getInput, setFailed, setSecret } from '@actions/core'
import { readFile } from 'fs'
import { promisify } from 'util'

const readFileAsync = promisify(readFile)

async function main() {
  try {
    const path = getInput('filePath')
    const mask = getBooleanInput('mask')
    const source = await readFileAsync(path, { encoding: 'utf8' })
    const lines = source.split('\n')

    lines
      .filter((it) => it.length > 0)
      .forEach((line) => {
        const [variable, value] = line.split('=')
        if (mask) {
          setSecret(value)
        }
        exportVariable(variable, value)
      })
  } catch (e) {
    setFailed(e)
  }
}

main()

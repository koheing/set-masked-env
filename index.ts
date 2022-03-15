import { exportVariable, getInput, setFailed, setSecret } from '@actions/core'
import { readFile } from 'fs'
import { promisify } from 'util'

const readFileAsync = promisify(readFile)

async function main() {
  try {
    const path = getInput('path')
    const source = await readFileAsync(path, { encoding: 'utf8' })
    const lines = source.replaceAll('\r\n', '\n').split('\n')
    
    lines.forEach((line) => {
      console.log(`line: ${line}`)
      const [variable, value] = line.split('=')
      setSecret(value)
      exportVariable(variable, value)
    })
  } catch (e) {
    setFailed(e)
  }
}

main()

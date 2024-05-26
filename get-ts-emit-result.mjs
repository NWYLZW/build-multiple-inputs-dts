import fs from 'node:fs'
import path from 'node:path'

import ts from 'typescript'

const dirName = path.dirname(new URL(import.meta.url).pathname)
const dtsfilepath = path.resolve(dirName, 'tsconfig.json')
const compilerOptionsJson = JSON.parse(fs.readFileSync(dtsfilepath, 'utf8')).compilerOptions
const compilerOptions = {
  ...ts.convertCompilerOptionsFromJson(compilerOptionsJson, dirName).options,
  declaration: true,
  emitDeclarationOnly: true
}

function build_a_By_a_Entry() {
  const files = [
    'src/a.ts'
  ].map(p => path.resolve(dirName, p))

  const host = ts.createCompilerHost(compilerOptions, true)
  const program = ts.createProgram(files, compilerOptions, host)

  console.log(program.getSourceFiles().map(f => f.fileName).filter(f => !f.endsWith('.d.ts')))
  console.log(program.emit(
    program.getSourceFile(path.resolve(dirName, 'src/a.ts')),
    (_, text) => {
      console.log({ _, text })
    },
    undefined,
    true
  ))
}

function build_a_By_b_Entry() {
  const files = [
    'src/b.ts'
  ].map(p => path.resolve(dirName, p))

  const host = ts.createCompilerHost(compilerOptions, true)
  const program = ts.createProgram(files, compilerOptions, host)

  console.log(program.getSourceFiles().map(f => f.fileName).filter(f => !f.endsWith('.d.ts')))
  console.log(program.emit(
    program.getSourceFile(path.resolve(dirName, 'src/a.ts')),
    (_, text) => {
      console.log({ _, text })
    },
    undefined,
    true
  ))
}

if (process.argv[2] === 'a') {
  build_a_By_a_Entry()
}
if (process.argv[2] === 'b') {
  build_a_By_b_Entry()
}

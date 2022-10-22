#!/usr/bin/env node
import fs from 'fs'

const SOURCE_ROOT = 'src'
const DOMAIN_ROOT = 'domain'
const INTERFACE_ADAPTER_ROOT = 'interface-adapter'
const USE_CASE_ROOT = 'use-case'
const INFRA_ROOT = 'infra'

const mkdirOptions = {
  recursive: true,
}

/**
 *
 * @param {string} moduleName
 * @param {'service' | 'controller' | 'module'} type
 * @param {string} parentPath
 */

;(() => {
  if (!process.argv[2]) return console.error('\x1b[31m%s\x1b[0m', 'Error, input module name')

  const moduleName = process.argv[2]
  const moduleRoot = `${SOURCE_ROOT}/${moduleName}`

  const replaceModuleName = (moduleName, { type, parentPath }) => {
    const firstCharUpperCaseModuleName = moduleName.replace(/^[a-z]/, char => char.toUpperCase())
    const fileName = `${moduleName}.${type}.ts`
    const path = type === 'module' ? `${moduleRoot}/${fileName}` : `${moduleRoot}/${parentPath}/${fileName}`

    fs.writeFileSync(
      path,
      fs
        .readFileSync(`./template/template.${type}.txt`)
        .toString()
        .replace(/{Name}/g, firstCharUpperCaseModuleName)
        .replace(/{name}/g, moduleName),
    )
  }

  if (moduleName) {
    console.log('\x1b[32m%s\x1b[0m', `moduleName : ${moduleName}`)
    fs.mkdirSync(`${moduleRoot}/${DOMAIN_ROOT}/repository`, mkdirOptions)
    fs.mkdirSync(`${moduleRoot}/${INTERFACE_ADAPTER_ROOT}/dto`, mkdirOptions)
    fs.mkdirSync(`${moduleRoot}/${USE_CASE_ROOT}`, mkdirOptions)
    fs.mkdirSync(`${moduleRoot}/${INFRA_ROOT}/entity`, mkdirOptions)
  } else console.error('\x1b[31m%s\x1b[0m', 'Error, usage: $mkdirca {root}')

  const MODULE_ELEMS = [
    { type: 'module', parentPath: '' },
    { type: 'controller', parentPath: INTERFACE_ADAPTER_ROOT },
    { type: 'service', parentPath: USE_CASE_ROOT },
  ]

  MODULE_ELEMS.forEach(elem => replaceModuleName(moduleName, elem))
})()

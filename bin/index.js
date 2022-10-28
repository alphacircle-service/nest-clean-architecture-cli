#!/usr/bin/env node
import fs from 'fs'
import TEMPLATE from '../lib/template/index.js'

const SOURCE_ROOT = 'src'
const DOMAIN_ROOT = 'domain'
const INTERFACE_ADAPTER_ROOT = 'interface-adapter'
const USE_CASE_ROOT = 'use-case'
const INFRA_ROOT = 'infra'

const mkdirOptions = {
  recursive: true,
}

const PATH_PREFIX = {
  a: 'admin',
  m: 'mobile',
  admin: 'admin',
  mobile: 'mobile',
}

;(() => {
  if (!process.argv[2]) return console.error('\x1b[31m%s\x1b[0m', 'Error, input module name')

  const pathPrefix = process.argv[3] ? PATH_PREFIX[process.argv[2]] : ''
  const moduleName = pathPrefix ? process.argv[3] : process.argv[2]
  if (!moduleName) {
    console.error('\x1b[31m%s\x1b[0m', 'Error, usage: $mkdirca {root}')
    return
  }
  const moduleRoot = pathPrefix ? `${SOURCE_ROOT}/${pathPrefix}/${moduleName}` : `${SOURCE_ROOT}/${moduleName}`

  console.log('\x1b[32m%s\x1b[0m \x1b[32m%s\x1b[0m', `pathPrefix : ${pathPrefix}`, `moduleName : ${moduleName}`)
  fs.mkdirSync(`${moduleRoot}/${DOMAIN_ROOT}/repository`, mkdirOptions)
  fs.mkdirSync(`${moduleRoot}/${INTERFACE_ADAPTER_ROOT}/dto`, mkdirOptions)
  fs.mkdirSync(`${moduleRoot}/${USE_CASE_ROOT}`, mkdirOptions)
  fs.mkdirSync(`${moduleRoot}/${INFRA_ROOT}/repository`, mkdirOptions)
  fs.mkdirSync(`${moduleRoot}/${INFRA_ROOT}`, mkdirOptions)
  fs.mkdirSync(`${SOURCE_ROOT}/entities`, mkdirOptions)

  const MODULE_ELEMS = [
    { type: 'module', parentPath: '' },
    { type: 'controller', parentPath: INTERFACE_ADAPTER_ROOT },
    { type: 'service', parentPath: USE_CASE_ROOT },
    { type: 'repository', parentPath: `${INFRA_ROOT}/repository` },
    { type: 'entity', parentPath: `entities` },
    { type: 'create', parentPath: `${INTERFACE_ADAPTER_ROOT}/dto`, fileNameFix: `create-${moduleName}.dto.ts` },
    { type: 'update', parentPath: `${INTERFACE_ADAPTER_ROOT}/dto`, fileNameFix: `update-${moduleName}.dto.ts` },
    { type: 'domain', parentPath: DOMAIN_ROOT, fixNameFix: `${moduleName}.ts` },
    { type: 'iRepository', parentPath: `${DOMAIN_ROOT}/repository`, fileNameFix: `i${moduleName}.repository.ts` },
  ]

  const replaceModuleName = (moduleName, { type, parentPath, fileNameFix }) => {
    const firstCharUpperCaseModuleName = moduleName.replace(/^[a-z]/, char => char.toUpperCase())
    const fileName = fileNameFix ? fileNameFix : `${moduleName}.${type}.ts`
    let path = `${moduleRoot}/`
    path += parentPath ? `${parentPath}/${fileName}` : `${fileName}`

    if (type === 'entity') {
      fs.existsSync(path)
        ? console.error('\x1b[31m%s\x1b[0m', `Error, already exists: ${path}`)
        : fs.writeFileSync(
            `${SOURCE_ROOT}/entities/${fileName}`,
            TEMPLATE[type].replace(/{Name}/g, firstCharUpperCaseModuleName).replace(/{name}/g, moduleName),
          )
      return
    }

    fs.existsSync(path)
      ? console.error('\x1b[31m%s\x1b[0m', `Error, already exists: ${path}`)
      : fs.writeFileSync(
          path,
          TEMPLATE[type].replace(/{Name}/g, firstCharUpperCaseModuleName).replace(/{name}/g, moduleName),
        )
  }

  MODULE_ELEMS.forEach(elem => replaceModuleName(moduleName, elem))

  console.log('\x1b[33m%s\x1b[0m', 'create complate!')
  if (pathPrefix) {
    console.log('\x1b[35m%s\x1b[0m', `add please 'src/${pathPrefix}/${pathPrefix}.module.ts' : `)
    console.log(`    imports: [${moduleName}Module]`)
  }
})()

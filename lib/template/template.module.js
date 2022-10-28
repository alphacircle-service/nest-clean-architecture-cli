export const moduleTemplate = `
import { Module } from '@nestjs/common'
import { {Name}Service } from './use-case/{name}.service'
import { {Name}Controller } from './interface-adapter/{name}.controller'

@Module({
  controllers: [{Name}Controller],
  providers: [{Name}Service]
})
export class {Name}Module {}
`
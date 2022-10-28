export const moduleTemplate = `
import { Module } from '@nestjs/common'
import { {Name}Service } from './use-case/{name}.service'
import { {Name}Controller } from './interface-adapter/{name}.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { {Name}Entity } from 'src/entities/{name}.entity'

@Module({
  imports: [TypeOrmModule.forFeature([{Name}Entity])],
  controllers: [{Name}Controller],
  providers: [{Name}Service]
})
export class {Name}Module {}
`

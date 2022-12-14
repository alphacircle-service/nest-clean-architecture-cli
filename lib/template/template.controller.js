export const controllerTemplate = `
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { {Name}Service } from '../use-case/{name}.service'
import { Create{Name}Dto } from './dto/create-{name}.dto'
import { Update{Name}Dto } from './dto/update-{name}.dto'

@Controller('{name}')
export class {Name}Controller {
  constructor(private readonly {name}Service: {Name}Service) {}

  @Get()
  findAll() {
    return this.{name}Service.findAll()
  }

  @Post()
  create(@Body() create{Name}Dto: Create{Name}Dto) {
    return this.{name}Service.create(create{Name}Dto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.{name}Service.findOne(+id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() update{Name}Dto: Update{Name}Dto) {
    return this.{name}Service.update(+id, update{Name}Dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.{name}Service.remove(+id)
  }
}
`

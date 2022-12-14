export const serviceTemplate = `
import { Injectable } from '@nestjs/common'
import { {Name} } from '../domain/{name}.domain'

@Injectable()
export class {Name}Service {
  findAll() {
    return \`This action returns all {name}\`
  }

  create({name}: {Name}) {
    return 'This action adds a new {name}'
  }

  findOne(id: number) {
    return \`This action returns a #\${id} {name}\`
  }

  update(id: number, {name}: {Name}) {
    return \`This action updates a #\${id} {name}\`
  }

  remove(id: number) {
    return \`This action removes a #\${id} {name}\`
  }
}

`

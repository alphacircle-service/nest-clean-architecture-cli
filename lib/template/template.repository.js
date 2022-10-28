export const repositoryTemplate = `
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { I{Name}Repository } from 'src/{name}/domain/repository/i{name}.repository'
import { {Name}Entity } from 'src/entities/{name}.entity'

@Injectable()
export class {Name}Repository implements I{Name}Repository {
  constructor(
    @InjectRepository({Name}Entity) private {name}Repository: Repository<{Name}Entity>,
  ) { }


}
`

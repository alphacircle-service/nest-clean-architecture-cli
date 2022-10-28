export const entityTemplate = `
import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('{name}')
export class {Name}Entity {
    @PrimaryGeneratedColumn({ type: 'smallint' })
    id: number
}
`

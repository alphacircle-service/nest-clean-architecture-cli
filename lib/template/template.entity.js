export const entityTemplate = `
import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('{Name}')
export class {Name}Entity {
    @PrimaryGeneratedColumn({ type: 'smallint' })
    id: number
}
`

import {Entity, PrimaryColumn} from 'typeorm';

@Entity()

export class Tag {
    @PrimaryColumn()
    title: string;
}

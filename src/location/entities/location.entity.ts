import { BaseEntity } from 'src/common/dto/base.dto';
import { Country } from 'src/country/entities/country.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('Location')
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => Country, (country) => country.locations, { lazy: true })
  country: Promise<Country>; 

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ type: 'varchar', length: 100 })
  addedBy: string;

  @Column({ type: 'varchar', length: 100 })
  updatedBy: string;

  @Column({ type: 'boolean', default: false })
  isDelete: boolean;
}
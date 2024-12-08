import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  zipCode: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  companyName?: string;

  @Column({ nullable: true })
  profession?: string;

  @Column({ nullable: true })
  referredBy?: string;

  @OneToOne(() => User, user => user.student)
  @JoinColumn()
  user: User;


  @Column()
  password: string;

  @Column()
  signupDate: Date;

  @Column()
  downloadedImfopac: number;

  @Column()
  addedBy: number;

  @Column({ nullable: true })
  updatedBy?: number;

  @Column({ default: false })
  isDelete: boolean;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  lastLogin?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

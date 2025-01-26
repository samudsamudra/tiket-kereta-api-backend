import { Pelanggan } from '../../../pelanggan/entities/pelanggan/pelanggan.entity';

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column()
  role!: 'admin' | 'penumpang' | 'petugas'; // Tambahkan 'petugas'

  @OneToOne(() => Pelanggan, (pelanggan) => pelanggan.user, { cascade: true })
  @JoinColumn()
  pelanggan?: Pelanggan; // Optional property for pelanggan
}

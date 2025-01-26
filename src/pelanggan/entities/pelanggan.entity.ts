import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('pelanggan')
export class Pelanggan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nik!: string;

  @Column()
  nama_penumpang!: string;

  @Column()
  alamat!: string;

  @Column()
  telp!: string;

  @OneToOne(() => User, (user) => user.pelanggan, { nullable: true }) // Tambahkan nullable
  user?: User;
}

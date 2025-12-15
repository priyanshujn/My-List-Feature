
import mongoose from 'mongoose';
import { createInitalData } from './data';


async function seed() {
  await mongoose.connect('mongodb://localhost:27017/mylist');

  await createInitalData();

  console.log('Seed data inserted');
  process.exit(0);
}

seed();

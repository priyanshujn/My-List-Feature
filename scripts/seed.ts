
import mongoose from 'mongoose';
import MyList from '../src/modules/my-list/myList.model';

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/mylist');
  await MyList.deleteMany({});

  await MyList.insertMany([
    { userId: 'user_1', contentId: 'movie_1', contentType: 'MOVIE' },
    { userId: 'user_1', contentId: 'tv_1', contentType: 'TV_SHOW' }
  ]);

  console.log('Seed data inserted');
  process.exit(0);
}

seed();

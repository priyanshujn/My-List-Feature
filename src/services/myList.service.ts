import MyList from '../models/myList.model';
import { getRedis } from '../config/redisClient';

export async function addItem(userId: string, contentId: string, contentType: string) {
  const Redis = getRedis();

  try {
    const addData = await MyList.updateOne(
      { userId, contentId },
      { $setOnInsert: { contentType, createdAt: new Date() } },
      { upsert: true }
    );

    await Redis.del(`mylist:${userId}:page:1`);
    return;
  } catch (error) {
    console.error("error in list item add service: ", error);
    throw error;
  }

}

export async function removeItem(userId: string, contentId: string) {
  const Redis = getRedis();

  try {
    await MyList.deleteOne({ userId, contentId });
    await Redis.del(`mylist:${userId}:page:1`);
    return;
  } catch (error) {
    console.error("error in list item delete service: ", error);
    throw error;
  }

}

export async function listItems(userId: string, page: number, limit: number) {
  const Redis = getRedis();

  try {
    const key = `mylist:${userId}:page:${page}`;

    if (page === 1) {
      const cached = await Redis.get(key);
      if (cached) return JSON.parse(cached);
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      MyList.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      MyList.countDocuments({ userId })
    ]);

    const result = { items, total };

    if (page === 1) {
      await Redis.setex(key, 30, JSON.stringify(result));
    }

    return result;
  } catch (error) {
    console.error("error in list items get service: ", error);
    throw error;
  }
}

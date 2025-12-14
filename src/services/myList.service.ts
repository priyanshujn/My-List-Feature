
import MyList from '../models/myList.model';

export async function addItem(userId: string, contentId: string, contentType: string) {
  await MyList.updateOne(
    { userId, contentId },
    { $setOnInsert: { contentType, createdAt: new Date() } },
    { upsert: true }
  );
}

export async function removeItem(userId: string, contentId: string) {
  await MyList.deleteOne({ userId, contentId });
}

export async function listItems(userId: string, page: number, limit: number) {
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    MyList.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    MyList.countDocuments({ userId })
  ]);

  return { items, total };
}

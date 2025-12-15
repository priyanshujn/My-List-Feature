
import { Request, Response } from 'express';
import * as ListService from '../services/myList.service';
import { CONSTANTS, CONTENT_TYPES } from '../utils/constants';

export async function addListItem(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string || 'user_1';
  const { contentId, contentType } = req.body;

  // check if the content exists
  let collection;

  if (contentType === CONTENT_TYPES.MOVIE) {
    collection = require('../models/movie.model').default;
  } else if (contentType === CONTENT_TYPES.TV_SHOW) {
    collection = require('../models/tvShow.model').default;
  }

  const contentExists = await collection.exists({ id: contentId });

  try {
    if (!contentExists) {
      return res.status(404).json({ success: false, message: "Content not found." });
    }

    await ListService.addItem(userId, contentId, contentType);
    return res.json({ success: true, message: "Item added to the list successfully." });
  } catch (error) {

  }
}


export async function removeListItem(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string || 'user_1';
  const { contentId } = req.params;

  await ListService.removeItem(userId, contentId);
  return res.json({ success: true, message: "Item removed from the list successfully." });
}


export async function getListItems(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string || 'user_1';
  const page = Number(req.query.page || CONSTANTS.DEFAULT_PAGE);
  const limit = Number(req.query.limit || CONSTANTS.DEFAULT_LIMIT);

  const { items, total } = await ListService.listItems(userId, page, limit);

  return res.json({
    items,
    pagination: { page, limit, total }
  });
}

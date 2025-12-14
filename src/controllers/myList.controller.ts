
import { Request, Response } from 'express';
import * as ListService from '../services/myList.service';
import { CONSTANTS } from '../utils/common';

export async function addListItem(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string;
  const { contentId, contentType } = req.body;

  await ListService.addItem(userId, contentId, contentType);
  res.json({ success: true });
}

export async function removeListItem(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string;
  const { contentId } = req.params;

  await ListService.removeItem(userId, contentId);
  res.json({ success: true });
}

export async function getListItems(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string;
  const page = Number(req.query.page || CONSTANTS.DEFAULT_PAGE);
  const limit = Number(req.query.limit || CONSTANTS.DEFAULT_LIMIT);

  const { items, total } = await ListService.listItems(userId, page, limit);

  res.json({
    items,
    pagination: { page, limit, total }
  });
}

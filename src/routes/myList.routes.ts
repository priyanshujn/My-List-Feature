
import { Router } from 'express';
import * as ListController from '../controllers/myList.controller';
import { validate } from '../middleware/validate';
import { addListSchema, GetListSchema, removeListSchema } from '../schemas/myList.schema';

const router = Router();

router.post('/', validate(addListSchema), ListController.addListItem);

router.delete('/:contentId', validate(removeListSchema), ListController.removeListItem);

router.get('/', validate(GetListSchema), ListController.getListItems);

export default router;

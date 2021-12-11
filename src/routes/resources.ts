import Router from 'koa-router';
import { find, status, create } from '../controllers/resourcesController';

const router: Router = new Router();
router.get('/api/resources', find);
router.post('/api/resources', create);

export default router;

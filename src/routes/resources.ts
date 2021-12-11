import Router from 'koa-router';
import { status } from '../controllers/resourcesController';

const router: Router = new Router();
router.get('/api/resources', status);

export default router;

import Router from 'koa-router';
import { find, status, create } from '../controllers/resourcesController';
import { findCustom } from '../controllers/customResources';

const router: Router = new Router();
router.get('/api/resources', find);
router.post('/api/resources', create);
// router.get('/api/resources/:schema/:id', findOneCustom);
router.get('/api/v1/:schema', findCustom);

export default router;

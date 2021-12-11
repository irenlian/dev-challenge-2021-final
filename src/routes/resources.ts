import Router from 'koa-router';
import { find, create, deleteResource, updateResource } from '../controllers/resourcesController';
import { findCustom, createCustom, findOneCustom, updateCustom, deleteCustom } from '../controllers/customResources';

const router: Router = new Router();
router.get('/api/resources', find);
router.post('/api/resources', create);
router.delete('/api/resources/:schema', deleteResource);
router.put('/api/resources/:schema', updateResource);

router.get('/api/v1/:schema/:id', findOneCustom);
router.put('/api/v1/:schema/:id', updateCustom);
router.delete('/api/v1/:schema/:id', deleteCustom);
router.get('/api/v1/:schema', findCustom);
router.post('/api/v1/:schema', createCustom);

export default router;

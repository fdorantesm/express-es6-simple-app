import Router from 'router';
import Teams from 'controllers/Teams';

const router = Router(); // eslint-disable-line

router.route('/')
    .get(Teams.list)
    .post(Teams.create);

router.route('/:id')
    .get(Teams.get)
    .put(Teams.update)
    .delete(Teams.delete);

export default router;

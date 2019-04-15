import Router from 'router';
import Teams from 'controllers/Teams';
import validator from 'middlewares/validator';

const router = Router(); // eslint-disable-line

router.route('/')
    .get(Teams.list)
    .post(validator, Teams.create);

router.route('/:id')
    .get(Teams.get)
    .put(validator, Teams.update)
    .delete(Teams.delete);

export default router;

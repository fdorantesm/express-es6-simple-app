import Router from 'router';
import teams from 'routes/teams';

const router = Router(); // eslint-disable-line

router.use('/teams', teams);

export default router;

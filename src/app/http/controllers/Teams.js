import Team from 'models/Team';

/**
 * Teams Controller
 */
export default class Teams {
  /**
   * Method to list all teams
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */
  static async list(req, res, next) {
    try {
      const result = await Team.find();
      res.send(result);
    } catch (err) {
      next(err);
    }
  }
  /**
   * Method to get a single team
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */
  static async get(req, res, next) {
    try {
      const result = await Team.findById(req.params.id);
      res.send(result);
    } catch (err) {
      next(err);
    }
  }
  /**
   * Method to create a team
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */
  static async create(req, res, next) {
    try {
      const team = new Team(req.body);
      await team.save();
      res.status(201).send(team);
    } catch (err) {
      next(err);
    }
  }
  /**
   * Method to update a team
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */
  static async update(req, res, next) {
    try {
      const team = await Team.findById(req.params.id);
      Object.keys(req.body).map((key) => {
        team[key] = req.body[key];
      });
      await team.save();
      res.status(200).send(team);
    } catch (err) {
      next(err);
    }
  }
  /**
   * Method to delete a team
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */
  static async delete(req, res, next) {
    try {
      const team = await Team.findByIdAndRemove(req.params.id);
      res.status(204).send(team);
    } catch (err) {
      next(err);
    }
  }
}

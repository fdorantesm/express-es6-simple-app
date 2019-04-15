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
   */
  static async list(req, res) {
    try {
      const populate = ['members'];
      const pagination = {
        page: req.query.page || 1,
        limit: req.query.perPage || 12,
        populate,
      };
      const filter = {};
      const result = await Team.paginate(filter, pagination);
      res.send(result);
    } catch (err) {
      res.boom.internal(err);
    }
  }
  /**
   * Method to get a single team
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async get(req, res) {
    try {
      const result = await Team.findById(req.params.id);
      res.send(result);
    } catch (err) {
      res.boom.internal(err);
    }
  }
  /**
   * Method to create a team
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async create(req, res) {
    try {
      const team = new Team(req.body);
      res.status(201).send(team);
    } catch (err) {
      res.boom.internal(err);
    }
  }
  /**
   * Method to update a team
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async update(req, res) {
    try {
      const team = await Team.updateOne({id: req.params.id}, req.body);
      res.status(202).send(team);
    } catch (err) {
      res.boom.internal(err);
    }
  }
  /**
   * Method to delete a team
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async delete(req, res) {
    try {
      const team = await Team.findByIdAndRemove(req.params.id);
      res.send(team);
    } catch (err) {
      res.boom.internal(err);
    }
  }
}

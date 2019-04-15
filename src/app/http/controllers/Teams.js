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
      const result = await Team.find();
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
      await team.save();
      res.status(201).send(team);
    } catch (err) {
      if (err.name === 'ValidationError') {
        res.boom.badData(err);
      } else {
        res.boom.internal(err);
      }
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
      const team = await Team.findById(req.params.id);
      Object.keys(req.body).map((key) => {
        team[key] = req.body[key];
      });
      await team.save();
      res.status(200).send(team);
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
      res.status(204).send(team);
    } catch (err) {
      res.boom.internal(err);
    }
  }
}

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
    res.send({method: 'list'});
  }
  /**
   * Method to get a single team
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async get(req, res) {
    res.send({method: 'get'});
  }
  /**
   * Method to create a team
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async create(req, res) {
    res.send({method: 'create'});
  }
  /**
   * Method to update a team
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async update(req, res) {
    res.send({method: 'update'});
  }
  /**
   * Method to delete a team
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async delete(req, res) {
    res.send({method: 'delete'});
  }
}

"use strict";

const User = use("App/Models/User");

/** @typedef {import('@adonisjs/framework/src/Request')} */
/** @typedef {import('@adonisjs/framework/src/Response')} */

class UserController {
  async index({ request, response }) {
    return User.all();
  }

  async register({ request, response }) {
    try {
      const data = request.only([
        "username",
        "email",
        "password",
        "firstname",
        "lastname",
      ]);

      const usernameExists = await User.findBy("username", data.username);
      const emailExists = await User.findBy("email".data.email);

      if (usernameExists) {
        return response
          .status(400)
          .send({ message: "Username already exists" });
      }

      if (emailExists) {
        return response.status(400).send({ message: "Email already exists" });
      }

      const user = await User.create(data);
      return user;
    } catch (e) {
      return response.status(e.status).send(e);
    }
  }
}

module.exports = UserController;

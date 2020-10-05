"use strict";

const User = use("App/Models/User");
const Hash = require("@adonisjs/framework/src/Hash");
const randomString = require("random-string");
const Mail = use("Mail");

/** @typedef {import('@adonisjs/framework/src/Request')} */
/** @typedef {import('@adonisjs/framework/src/Response')} */

class UserController {
  // All User List
  async index({ request, response }) {
    return User.all();
  }

  // User Registration
  async register({ request, response }) {
    try {
      const data = request.only([
        "username",
        "email",
        "password",
        "firstname",
        "lastname",
      ]);

      // Check if username already exists
      const usernameExists = await User.findBy("username", data.username);
      // Chech if email already exists
      const emailExists = await User.findBy("email", data.email);

      // Throw error if true - username exists
      if (usernameExists) {
        return response
          .status(409)
          .send({ message: { e: "Username already exists" } });
      }

      // Throw error if true - email exists
      if (emailExists) {
        return response
          .status(409)
          .send({ message: { e: "Email already exists" } });
      }

      // Create user with random string for confirmation token
      const user = await User.create({
        username: request.input("username"),
        email: request.input("email"),
        password: request.input("password"),
        firstname: request.input("firstname"),
        lastname: request.input("lastname"),
        confirmation_token: randomString({ length: 40 }),
      });

      // Send confirmation Mail
      await Mail.send("confirm_email", user.toJSON(), (message) => {
        message
          .to(user.email)
          .from("admin@events.com")
          .subject("Email Address Confirmation");
      });

      return user;
    } catch (e) {
      return response.status(e.status).send(e);
    }
  }

  // User Login
  async login({ request, auth, response }) {
    try {
      // get email
      const data = request.only(["email"]);
      // find user by email
      const user = await User.findBy("email", data.email);
      // check if is_active is true
      if (!user.is_active) {
        return response.json({
          status: 406,
          message: "Please confirm your email address",
        });
      }

      // attempt login with jwt
      const token = await auth.attempt(
        request.input("email"),
        request.input("password")
      );

      return response.json({
        status: 200,
        data: token,
      });
    } catch (e) {
      return response.status(400).json({
        status: "error",
        message: "Invalid email/password",
      });
    }
  }

  // Email Address Confirmation
  async confirmEmail({ params, view }) {
    // Get User by their confirmation token
    const user = await User.findBy("confirmation_token", params.token);

    user.confirmation_token = null;
    user.is_active = true;

    await user.save();

    return view.render("activated");
  }
}

module.exports = UserController;

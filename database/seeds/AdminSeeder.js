"use strict";

/*
|--------------------------------------------------------------------------
| AdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Hash = use("Hash");

class AdminSeeder {
  async run() {
    console.log("Creating Admin Account");

    // Initial Admin Account
    Factory.blueprint("users", async (faker) => {
      return {
        username: "aldrinpeter",
        email: "aldrindeguzman1998@gmail.com",
        password: await Hash.make("aldrin1998"),
        firstname: "Aldrin",
        lastname: "De Guzman",
        is_active: 1,
        is_admin: 1,
      };
    });

    await Factory.get("users").create();
  }
}

module.exports = AdminSeeder;

"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

// Seed Fake Users
Factory.blueprint("App/Models/User", (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: faker.password(),
    firstname: faker.first(),
    lastname: faker.last(),
    is_active: 1,
    is_admin: 0,
  };
});

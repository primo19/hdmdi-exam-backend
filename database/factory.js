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

Factory.blueprint("App/Models/User", (faker) => {
  return {
    username: "aldrinpeter",
    email: "aldrindeguzman1998@gmail.com",
    password: "Redflyer-1998",
    firstname: "Aldrin",
    lastname: "De Guzman",
    is_active: 1,
    is_admin: 1,
  };
});

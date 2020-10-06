"use strict";

/*
|--------------------------------------------------------------------------
| EventSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class EventSeeder {
  async run() {
    console.log("Seeding Event Table");

    const user = await Factory.model("App/Models/User").create();
    const event = await Factory.model("App/Models/Event").make();

    await user.events().save(event);
  }
}

module.exports = EventSeeder;

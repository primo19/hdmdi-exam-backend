"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EventsSchema extends Schema {
  up() {
    this.create("events", (table) => {
      table.increments();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.string("title", 60).notNullable();
      table.string("slug", 255).notNullable();
      table.text("description").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("events");
  }
}

module.exports = EventsSchema;

"use strict";

const { findOrFail } = require("../../Models/User");

const Event = use("App/Models/Event");

/** @typedef {import('@adonisjs/framework/src/Request')} */
/** @typedef {import('@adonisjs/framework/src/Response')} */

class EventController {
  // Get all events with user populated
  async index({ request, response }) {
    return Event.query().with("user").fetch();
  }

  // Add Event
  async add({ request, response }) {
    try {
      const data = request.only(["user_id", "title", "slug", "description"]);
      const eventExists = await Event.findBy("slug", data.slug);

      if (eventExists) {
        return response.status(400).send({ message: "Event already exists" });
      }

      const event = await Event.create(data);
      return event;
    } catch (e) {
      return response.status(e.status).send(e);
    }
  }

  // Update Event
  async update({ request, params, response }) {
    const event = await Event.find(params.id);

    event.title = request.input("title");
    event.description = request.input("description");

    await event.save();
  }

  // Show a single event
  async show({ params }) {
    const event = await Event.query()
      .where("id", params.id)
      .with("user")
      .firstOrFail();

    return event;
  }

  // Delete an event
  async destroy({ params, auth }) {
    const event = await findOrFail(params.id);

    // Check if the user owns the event before deleting
    if (event.user_id !== auth.user_id) {
      return response.json({
        status: 401,
        message: "You're unauthorized to delete this event",
      });
    }

    await event.delete();
  }
}

module.exports = EventController;

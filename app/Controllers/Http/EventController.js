"use strict";

const Event = use("App/Models/Event");

/** @typedef {import('@adonisjs/framework/src/Request')} */
/** @typedef {import('@adonisjs/framework/src/Response')} */

class EventController {
  async index({ request, response }) {
    return Event.all();
  }

  async add({ request, response }) {
    try {
      const data = request.only(["title", "slug", "description"]);
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
}

module.exports = EventController;

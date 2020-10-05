"use strict";

const { test, trait } = use("Test/Suite")("Event");
const Event = use("App/Models/Event");

trait("Test/ApiClient");

test("It should create an event", async ({ client }) => {
  await Event.create({
    title: "My Event",
    slug: "my-event",
    description: "My Test Event",
  });

  const response = await client.get("/event/list").end();

  response.assertStatus(200);

  response.assertJSONSubset([
    {
      title: "My Event",
      slug: "my-event",
      description: "My Test Event",
    },
  ]);
});

"use strict";

const { test, trait } = use("Test/Suite")("User");
const User = use("App/Models/User");

trait("Test/ApiClient");

test("It should create a user", async ({ client }) => {
  await User.create({
    username: "user1",
    email: "user1@gmail.com",
    password: "pass_user1",
    firstname: "User",
    lastname: "1",
    is_active: 0,
    is_admin: 0,
  });

  const response = await client.get("/user/list").end();

  response.assertStatus(200);

  response.assertJSONSubset([
    {
      username: "user1",
      email: "user1@gmail.com",
      firstname: "User",
      lastname: "1",
    },
  ]);
});

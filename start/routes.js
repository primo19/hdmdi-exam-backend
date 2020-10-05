"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
const Database = use("Database");

// Test Index Route
Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

// Test DB Connection Route
Route.get("/db", async () => {
  console.log("No DB Connection Error");
  return await Database.table("users").select("*");
});

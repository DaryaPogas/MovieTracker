const Movie = require("../models/Movie");
const User = require("../models/User");
const faker = require("@faker-js/faker").fakerEN_US;
const FactoryBot = require("factory-bot");
require("dotenv").config();

const testUserPassword = faker.internet.password(); 

const factory = FactoryBot.factory;
const factoryAdapter = new FactoryBot.MongooseAdapter();
factory.setAdapter(factoryAdapter);


factory.define("user", User, {
  name: () => faker.person.fullName(),
  email: () => faker.internet.email(),
  password: () => testUserPassword,
});


factory.define("movie", Movie, {
  title: () => faker.lorem.words({ min: 1, max: 4 }),
  director: () => faker.person.fullName(),
  year: () => faker.number.int({ min: 1990, max: 2024 }),
  genres: () =>
    faker.helpers.arrayElements(
      [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Fantasy",
        "Historical",
        "Horror",
        "Musical",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Thriller",
        "War",
        "Western",
      ],
      { min: 1, max: 3 }
    ),
  ageRating: () => faker.helpers.arrayElement(["G", "PG", "PG-13", "R"]),
  rating: () =>
    faker.helpers.arrayElement([
      "Perfect",
      "Great",
      "Good",
      "Okay",
      "Bad",
      "Spilled Popcorn",
    ]),
  review: () => faker.lorem.sentence({ min: 5, max: 12 }),
  status: () => faker.helpers.arrayElement(["watched", "planned", "abandoned"]),
  posterUrl: () => faker.image.urlLoremFlickr({ category: "movie" }),
  createdBy: FactoryBot.assoc("user", "_id"), 
});

const seed_db = async () => {
  let testUser = null;
  try {
    const mongoURL = process.env.MONGO_URI_TEST;
    await require("../db/connect")(mongoURL); 
    await Movie.deleteMany({});
    await User.deleteMany({});

    testUser = await factory.create("user");
    await factory.createMany("movie", 20, { createdBy: testUser._id });
  } catch (e) {
    console.log("Database error:");
    console.log(e.message);
    throw e;
  }
  return testUser;
};

module.exports = { testUserPassword, factory, seed_db };

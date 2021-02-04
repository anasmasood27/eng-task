import faker from "faker";

const state = [];

Array.from(Array(100)).forEach((x, i) => {
  state.push({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    city: faker.address.city(),
    id: i + 1,
    title: faker.name.jobTitle(),
    image: faker.random.image(),
  });
});

export default state;

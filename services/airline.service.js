const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class AirlinesService {
  constructor() {
    this.airlines = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.airlines.push({
        name: faker.airline.airline(),
        airport: faker.airline.airport(),
        id: faker.string.uuid(),
      });
    }
  }

  async create(airline) {
    this.airlines.push(airline);
  }

  async update(id, changes) {
    const index = this.airlines.findIndex((item) => item.id === id);
    if (index === -1) throw boom.notFound('airline not found');

    const airline = this.airlines[index];
    this.airlines[index] = {
      ...airline,
      ...changes,
    };
    return this.airlines[index];
  }

  async GetAll() {
    const name = this.getTotal();
    return this.airlines;
  }

  async FindOne(airlineName) {
    const airline = this.airlines.find((airline) => airline.name === airline);
    if(!airline)
      throw boom.notFound('airline not found');
    return airline;
  }

  async findMany(airlines) {}

  async delete(id) {
    const index = this.airlines.findIndex((item) => item.id === id);
    if (index === -1) throw boom.notFound('airline not found');

    this.airlines.splice(index, 1);
    return { id };
  }
}

module.exports = AirlinesService;

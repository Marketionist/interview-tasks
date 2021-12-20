'use strict';

const axios = require('axios');
const axiosRetry = require('axios-retry');
const { stamp } = require('js-automation-tools');
const { createPetData } = require('../utils/helper-functions.js');

// Extend jest tests timeout to 30 s
jest.setTimeout(40 * 1000);
// Set base URL for axios requests
const client = axios.create({ baseURL: 'https://petstore.swagger.io/v2' });
// Configure axios-retry on 404 to retry 3 times with 3 s interval
axiosRetry(client, {
    retries: 3,
    retryDelay: (retryCount) => {
        console.log(`Retry attempt: ${retryCount}`);
        return retryCount * 3000; // Time interval between retries
      },
    retryCondition: (error) => {
    // If retry condition is not specified, by default idempotent requests are retried
    return error.response.status === 404;
    }
});

const numberOfPets = 4;
let arrayPetIds = [];
let arrayPetData = [];
let arrayPets = [];

for (let i = 0; i < numberOfPets; i++) {
    arrayPetIds[i] = stamp.resetTimestamp();
    arrayPetData[i] = createPetData(arrayPetIds[i]);
}

describe('Testing /pet endpoints: ', () => {
    // Setup - create pets
    beforeAll(async () => {
        arrayPetData.map((value) => {
            arrayPets.push(client({
                method: 'post',
                url: '/pet',
                data: value
            }));
        });

        return Promise.all(arrayPets);
    });
    // // Teardown - delete pets
    // afterAll(async () => {
    //     await Promise.all(arrayPets);

    //     console.log('arrayPets[0]:', arrayPets[0]);

    //     let arrayPetsCleared = arrayPets.map((value) => {
    //         client({
    //             method: 'delete',
    //             url: `/pet/${value.data.id}`,
    //             headers: { 'api_key': 'special-key'}
    //         });
    //     });

    //     return await Promise.all(arrayPetsCleared);
    // });

    test('POST /pet should add a new pet to the store', async () => {
        const indexPet1 = 0;
        // Create a new pet
        const response = await arrayPets[indexPet1];

        expect(response.status).toBe(200);
        expect(response.data).toEqual(arrayPetData[indexPet1]);
    });

    test('GET /pet/{petId} should return a pet by id', async () => {
        const indexPet2 = 1;
        // Create a new pet
        const newPet2 = await arrayPets[indexPet2];

        const response = await client({
            method: 'get',
            url: `/pet/${newPet2.data.id}`
        });

        expect(response.status).toBe(200);
        expect(response.data).toEqual(arrayPetData[indexPet2]);
    });

    test('DELETE /pet/{petId} should delete a pet by id', async () => {
        const indexPet3 = 2;
        // Create a new pet
        const newPet3 = await arrayPets[indexPet3];

        const response = await client({
            method: 'delete',
            url: `/pet/${newPet3.data.id}`,
            headers: { 'api_key': 'special-key'}
        });

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('message', arrayPetIds[indexPet3]);

        // Remove the pet from the array before afterAll will clean it
        arrayPets.splice(indexPet3, 1);
    });

    test('GET /pet/{petId} for deleted pet should return 404', async () => {
        const indexPet4 = arrayPets.length - 1;
        // Create a new pet
        const newPet4 = await arrayPets[indexPet4];

        await client({
            method: 'delete',
            url: `/pet/${newPet4.data.id}`,
            headers: { 'api_key': 'special-key'}
        });

        const response = await client({
            method: 'get',
            url: `/pet/${arrayPetData[indexPet4].id}`,
            validateStatus: false
        });

        expect(response.status).toBe(404);
        expect(response.data).toHaveProperty('message', 'Pet not found');

        // Remove the pet from the array before afterAll will clean it
        arrayPets.splice(-1, 1);
    });

});

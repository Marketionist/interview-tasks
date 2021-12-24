'use strict';

const { stamp } = require('js-automation-tools');
const PetController = require('../utils/pet-controller.js');
const { setAxiosBaseUrl, enableAxiosRetry } = require(
    '../utils/axios-functional-config.js'
);

// Extend jest tests timeout to 40 s
jest.setTimeout(40000);

// Configure axios
const baseUrl = 'https://petstore.swagger.io/v2';
const retriesNumber = 3;
const retryInterval = 3000;
const axiosClient = setAxiosBaseUrl(baseUrl);
enableAxiosRetry(axiosClient, retriesNumber, retryInterval);

describe('Testing /pet endpoints: ', () => {
    const numberOfPets = 5;
    let arrayPetIds = [];
    let arrayPetData = [];
    let arrayPets = [];
    let arrayPetsToClear = [];

    // Setup - create pets
    beforeAll(async () => {
        // Setup pet ids and data
        for (let i = 0; i < numberOfPets; i++) {
            arrayPetIds[i] = stamp.resetTimestamp();
            arrayPetData[i] = PetController.createPetData(arrayPetIds[i]);
        }

        arrayPetData.forEach(async (value) => {
            arrayPets.push(PetController.createPet(axiosClient, value));
        });

        return Promise.all(arrayPets);
    });
    // Teardown - delete pets
    afterAll(async () => {
        let arrayPetsCleared = arrayPetsToClear.map(async (value) => {
            return await PetController.deletePet(axiosClient, value);
        });

        await Promise.all(arrayPetsCleared);
    });

    test('POST /pet should add a new pet to the store', async () => {
        const indexPet1 = 0;
        // Create a new pet
        const response = await arrayPets[indexPet1];

        expect(response.status).toBe(200);
        expect(response.data).toEqual(arrayPetData[indexPet1]);

        // Accumulate pet ids to be deleted in afterAll
        arrayPetsToClear.push(arrayPetIds[indexPet1]);
    });

    test('GET /pet/{petId} should return a pet by id', async () => {
        const indexPet2 = 1;
        // Create a new pet
        const newPet2 = await arrayPets[indexPet2];

        const response = await axiosClient({
            method: 'get',
            url: `/pet/${newPet2.data.id}`
        });

        expect(response.status).toBe(200);
        expect(response.data).toEqual(arrayPetData[indexPet2]);

        // Accumulate pet ids to be deleted in afterAll
        arrayPetsToClear.push(arrayPetIds[indexPet2]);
    });

    test('DELETE /pet/{petId} should delete a pet by id', async () => {
        const indexPet3 = 2;
        // Create a new pet
        const newPet3 = await arrayPets[indexPet3];

        const response = await axiosClient({
            method: 'delete',
            url: `/pet/${newPet3.data.id}`,
            headers: { 'api_key': 'special-key' }
        });

        expect(response.status).toBe(200);
        // Verify that proper pet id is returned after deletion
        expect(response.data).toHaveProperty('message', arrayPetIds[indexPet3]);
    });

    test('GET /pet/{petId} for deleted pet should return 404', async () => {
        const indexPet4 = 3;
        // Create a new pet
        const newPet4 = await arrayPets[indexPet4];

        await axiosClient({
            method: 'delete',
            url: `/pet/${newPet4.data.id}`,
            headers: { 'api_key': 'special-key' }
        });

        const response = await axiosClient({
            method: 'get',
            url: `/pet/${arrayPetData[indexPet4].id}`,
            validateStatus: false
        });

        expect(response.status).toBe(404);
        expect(response.data).toHaveProperty('message', 'Pet not found');
    });

    test('PUT /pet should update a pet', async () => {
        const indexPet5 = 4;
        // Create a new pet
        await arrayPets[indexPet5];
        let newPet5Data = arrayPetData[indexPet5];

        newPet5Data.tags.push({
            'id': 2,
            'name': 'added awesome tag 3'
        });

        const newPet5Updated = await axiosClient({
            method: 'put',
            url: '/pet',
            data: newPet5Data
        });

        expect(newPet5Updated.status).toBe(200);
        expect(newPet5Updated.data.tags).toEqual(newPet5Data.tags);

        // Accumulate pet ids to be deleted in afterAll
        arrayPetsToClear.push(arrayPetIds[indexPet5]);
    });

});

'use strict';

class PetController {

    /**
    * Creates and object with a new pet data
    * @param {String} id - id for a new pet
    * @returns {Object} - object with a new pet data
    */
    createPetData (id) {
        return {
            'id': parseInt(id),
            'category': {
                'id': 0,
                'name': 'awesome category'
            },
            'name': `awesome pet ${id}`,
            'photoUrls': [
                'string'
            ],
            'tags': [
                {
                    'id': 0,
                    'name': 'awesome tag 1'
                },
                {
                    'id': 1,
                    'name': 'awesome tag 2'
                }
            ],
            'status': 'available'
        };
    }

    /**
    * Creates a new pet
    * @param {Object} client - client instance (axios) to send request
    * @param {Object} data - new pet data
    * @returns {Object} - new pet creation response object
    */
    async createPet (client, data) {
        return client({
            method: 'post',
            url: '/pet',
            data: data
        });
    }

    /**
    * Deletes a pet
    * @param {Object} client - client instance (axios) to send request
    * @param {String} id - pet id
    * @returns {Object} - pet deletion response object
    */
    async deletePet (client, id) {
        return await client({
            method: 'delete',
            url: `/pet/${id}`,
            headers: { 'api_key': 'special-key'}
        });
    }

}

module.exports = new PetController();

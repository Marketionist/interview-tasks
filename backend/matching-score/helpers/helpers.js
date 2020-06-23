'use strict';

// #############################################################################

const compareBy = (key, order = 'asc') => {
    return function sortKeys (a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        const valueA = typeof a[key] === 'string' ?
            a[key].toUpperCase() : a[key];
        const valueB = typeof b[key] === 'string' ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;

        if (valueA > valueB) {
            comparison = 1;
        } else if (valueA < valueB) {
            comparison = -1;
        }

        return order === 'desc' ? comparison * -1 : comparison;
    };
};
const degrees180 = 180;
const degreesToRadians = (degrees) => degrees * (Math.PI / degrees180);

// https://en.wikipedia.org/wiki/Haversine_formula to calculate the distance
const getDistanceFromLatLonInKm = (
    latitude1, longitude1, latitude2, longitude2
) => {
    // Radius of the earth in km
    const r = 6371;
    const dLat = degreesToRadians(latitude2 - latitude1);
    const dLon = degreesToRadians(longitude2 - longitude1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(latitude1)) *
        Math.cos(degreesToRadians(latitude2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // Distance in km
    const d = r * c;

    return d;
};


module.exports = {
    compareBy,
    degreesToRadians,
    getDistanceFromLatLonInKm
};

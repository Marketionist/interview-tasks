'use strict';

// #############################################################################

const path = require('path');
const pathToDataDirectory = path.join(__dirname, '../data');

describe('Test helper functions', () => {
    const {
        compareBy,
        degreesToRadians,
        getDistanceFromLatLonInKm
    } = require('../helpers/helpers.js');

    it(
        'compareBy should compare properties in the object and sort descending',
        () => {
            const testObject = [
                {
                    number: 1
                },
                {
                    number: 2
                }
            ];

            expect(testObject.sort(compareBy('number', 'desc'))).toEqual([
                {
                    number: 2
                },
                {
                    number: 1
                }
            ]);
        }
    );

    it(
        'compareBy should compare properties in the object and sort ascending',
        () => {
            const testObject = [
                {
                    number: 3
                },
                {
                    number: 4
                }
            ];

            expect(testObject.sort(compareBy('number', 'asc'))).toEqual([
                {
                    number: 3
                },
                {
                    number: 4
                }
            ]);
        }
    );

    it(
        'compareBy should compare strings in the object and sort descending',
        () => {
            const testObject = [
                {
                    string: 'one'
                },
                {
                    string: 'two'
                }
            ];

            expect(testObject.sort(compareBy('string', 'desc'))).toEqual([
                {
                    string: 'two'
                },
                {
                    string: 'one'
                }
            ]);
        }
    );

    it(
        'compareBy should compare strings in the object and sort ascending',
        () => {
            const testObject = [
                {
                    string: 'three'
                },
                {
                    string: 'four'
                }
            ];

            expect(testObject.sort(compareBy('string', 'asc'))).toEqual([
                {
                    string: 'four'
                },
                {
                    string: 'three'
                }
            ]);
        }
    );

    it(
        'degreesToRadians should transform 1 degree to radians',
        () => {
            const oneDegreeInRadians = 0.017453292519943295;

            const radians = degreesToRadians(1);

            expect(radians).toEqual(oneDegreeInRadians);
        }
    );

    it(
        'getDistanceFromLatLonInKm should output the distance between two ' +
        'locations in kilometers provided latitude and longitude',
        () => {
            const coordinatesNewYork = {
                latitude: 40.7127753,
                longitude: -74.0059728
            }
            const coordinatesBrooklyn = {
                latitude: 40.6781784,
                longitude: -73.9441579
            }
            const distanceInKm = 6.477500820173394;
            const testDistanceInKm = getDistanceFromLatLonInKm(
                coordinatesNewYork.latitude,
                coordinatesNewYork.longitude,
                coordinatesBrooklyn.latitude,
                coordinatesBrooklyn.longitude
            );

            expect(testDistanceInKm).toEqual(distanceInKm);
        }
    );

});

describe('Test main functions', () => {
    const {
        getRespondentsArrayFromFile,
        getRespondentsArrayFromFiles,
        matchRespondents
    } = require('../index.js');

    it(
        'getRespondentsArrayFromFile should output 500 respondents',
        async () => {
            const respondentsNumber = 500;
            const respondentsFile = path.join(
                pathToDataDirectory, 'respondents_data_test.csv'
            );

            const repondents = await getRespondentsArrayFromFile(
                respondentsFile
            );

            expect(repondents.length).toEqual(respondentsNumber);
        }
    );

    it(
        'getRespondentsArrayFromFiles should output 500 respondents',
        async () => {
            const respondentsNumber = 500;

            const repondents = await getRespondentsArrayFromFiles(
                pathToDataDirectory
            );

            expect(repondents.length).toEqual(respondentsNumber);
        }
    );

    it(
        'matchingRespondentsArray should output 498 matched respondents',
        async () => {
            const matchedRespondentsNumber = 498;
            const respondentsDataArray = await getRespondentsArrayFromFiles(
                pathToDataDirectory
            );
            const matchingRespondentsArray = await matchRespondents(
                respondentsDataArray
            );

            expect(matchingRespondentsArray.length)
                .toEqual(matchedRespondentsNumber);
        }
    );

    it(
        'matchingRespondentsArray should contain one particular respondent',
        async () => {
            const repondentData = {
                name: 'Julian',
                distance: 6.477500820173394,
                score: 32
            };
            const respondentsDataArray = await getRespondentsArrayFromFiles(
                pathToDataDirectory
            );
            const matchingRespondentsArray = await matchRespondents(
                respondentsDataArray
            );

            expect(matchingRespondentsArray).toContain(repondentData);
        }
    );

});

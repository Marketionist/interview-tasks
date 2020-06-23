'use strict';

// #############################################################################

const path = require('path');
const csv = require('csvtojson');
const { readDirectories } = require('js-automation-tools');
const { compareBy, getDistanceFromLatLonInKm } = require(
    './helpers/helpers.js'
);
const errors = require('./errors/errors.js');
const projectData = require('./data/project.json');

const getRespondentsArrayFromFile = async (filePath) => {
    const fileExtension = path.extname(filePath);

    if (fileExtension === '.csv') {
        try {
            const respondentsArray = await csv().fromFile(filePath);

            return respondentsArray;
        } catch (err) {
            throw new Error(`${errors.ERROR_READING_FILE} ${filePath} ${err}`);
        }
    } else {
        console.info(`${errors.INFO_ONLY_CSV_SUPPORTED} ${filePath}`);
    }
};

const getRespondentsArrayFromFiles = async (directoryPath) => {
    const allDataFiles = await readDirectories([directoryPath]);
    let dataAccumulator = [];

    for (const file of allDataFiles) {
        const data = await getRespondentsArrayFromFile(file);

        if (data) {
            dataAccumulator = dataAccumulator.concat(data);
        }
    }

    return dataAccumulator;
};

const matchRespondents = async (respondentsArray) => {
    /* eslint-disable */
    const parameterWeights = {
        professionalJobTitles: process.env.JOB_TITLE_WEIGHT || 35,
        professionalIndustry: process.env.INDUSTRY_WEIGHT || 33,
        distance: process.env.DISTANCE_WEIGHT || 32
    };
    /* eslint-enable */
    const maxDistanceLimit = 100;

    const sortedRespondentsWithScore = respondentsArray.map((respondent) => {
        const distanceToRespondentFromAllLocations = projectData.cities.map(
            (city) => {
                const result = getDistanceFromLatLonInKm(
                    city.location.location.latitude,
                    city.location.location.longitude,
                    respondent.latitude,
                    respondent.longitude
                );

                return result;
            }
        );

        const minDistanceToRespondent = Math
            .min(...distanceToRespondentFromAllLocations);

        let respondentWithScore = {
            name: respondent.firstName,
            distance: minDistanceToRespondent,
            score: 0
        };

        if (projectData.professionalJobTitles.includes(respondent.jobTitle)) {
            respondentWithScore.score += parameterWeights.professionalJobTitles;
        }

        if (projectData.professionalIndustry.includes(respondent.industry)) {
            respondentWithScore.score += parameterWeights.professionalIndustry;
        }

        if (minDistanceToRespondent <= maxDistanceLimit) {
            respondentWithScore.score += parameterWeights.distance;
        }

        if (respondentWithScore.score > 0) {
            return respondentWithScore;
        }
    }).filter((value) => value !== undefined).sort(compareBy('score', 'desc'));

    return sortedRespondentsWithScore;
};

module.exports = {
    getRespondentsArrayFromFile,
    getRespondentsArrayFromFiles,
    matchRespondents
};

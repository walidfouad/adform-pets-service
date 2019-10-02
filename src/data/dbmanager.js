import appRoot from 'app-root-path';
import uuidv4 from 'uuid/v4';
import path from 'path';
import _ from 'lodash';
import fs from 'fs';

import formatData, { formatDataRow } from './dataformat';

const dbDirectory = path.join(appRoot.path, 'json_data');

export default class DBManager {

    constructor() {}

    readModels(modelTypes) {
        return new Promise((resolve, reject) => {
            if (!modelTypes || modelTypes.length === 0) {
                return reject(new Error('No model Types provided.'));
            }

            let result = [];
            modelTypes.forEach((modelType) => {
                if (modelType && modelType !== '') {
                    const modelData = this.loadModelFile(modelType.toLowerCase());
                    result = result.length === 0 ? result = modelData : result.concat(modelData);
                }
            });

            resolve(result);
        });

    }

    readSpecificModel(modelId, modelType) {
        return new Promise((resolve, reject) => {
            if (!modelType || modelType.length === 0) {
                return reject(new Error('No model Type provided.'));
            }

            const modelData = this.loadModelFile(modelType.toLowerCase());
            const aModel = _.find(modelData, { id: modelId });

            resolve(aModel);
        });

    }

    createNewModel(inputData) {
        return new Promise((resolve, reject) => {
            const modelType = inputData.type.toLowerCase();
            const id = uuidv4();
            inputData.id = id;

            const newModel = formatDataRow(inputData);

            let modelData = this.loadModelFile(modelType);

            // Now insert the new record into modelData array
            modelData.push(newModel);

            // here write to model file in json db directory
            this.writeModelFile(modelType, modelData);

            resolve(newModel);
        });
    }

    updateModel(modelId, inputData) {
        return new Promise((resolve, reject) => {
            const modelType = inputData.type.toLowerCase();

            inputData.id = modelId;

            const newModel = formatDataRow(inputData);

            let modelData = this.loadModelFile(modelType);

            const oldModelIndex = _.findIndex(modelData, { id: modelId });
            // Now insert the new record into modelData array
            modelData[oldModelIndex] = newModel;

            // here write to model file in json db directory
            this.writeModelFile(modelType, modelData);

            resolve(newModel);
        });
    }

    loadModelFile(modelType) {

        const modelFilePath = path.join(dbDirectory, modelType) + '.json';
        if (!fs.existsSync(modelFilePath)) {
            return [];
        }

        const modelBuffer = fs.readFileSync(modelFilePath);

        const modelData = (modelBuffer && modelBuffer.length > 0) ? JSON.parse(modelBuffer) : [];

        return modelData;
    }

    writeModelFile(modelType, modelData) {
        const modelFilePath = path.join(dbDirectory, modelType) + '.json';
        fs.writeFileSync(modelFilePath, JSON.stringify(modelData));
    }

    getOwners() {
        return this.loadModelFile('OWNER');
    }

    getDogs() {
        return this.loadModelFile('DOG');
    }

    getCats() {
        return this.loadModelFile('CAT');
    }

    getPets() {
        const dogs = this.getDogs();
        const cats = this.getCats();
        let pets = [];
        pets = dogs.concat(cats);

        return pets;
    }

    ownerPets(oId) {
        const pets = this.getPets();
        const fPets = _.filter(pets, { ownerId: oId });

        return fPets;
    }

    getOwner(oId) {
        const owners = this.getOwners();
        const owner = _.find(owners, { id: oId });

        return owner;
    }
}
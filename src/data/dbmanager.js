import appRoot from 'app-root-path';
import uuidv4 from 'uuid/v4';
import path from 'path';
import _ from 'lodash';
import fs from 'fs';

import formatData, { formatDataRow } from './dataformat';

const dbDirectory = path.join(appRoot.path, 'json_data');

/**
 * Manages all models related
 * Reading/Loading data models
 * Writing/Saving data models
 * helper functions like (getOwners, getPets, getDogs, ...etc) used for validation purposes
 */
export default class DBManager {

    constructor() {}

    /**
     * Gets all models data with specified model types
     * @param {array} modelTypes - carries an array of model types that required to load/read from file system
     */
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

    /**
     * Load and return a specific model with specified model id
     * @param {String} modelId - carries Model id
     * @param {enum} modelType - carries Model Type
     */
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

    /**
     * Creates new model, and add to the list of models, and then save to file system
     * @param {object} inputData - carries model data fields
     */
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

    /**
     * Updates model with specified model id
     * @param {String} modelId - carries model id
     * @param {object} inputData - carries model data fields
     */
    updateModel(modelId, inputData) {
        return new Promise((resolve, reject) => {
            const modelType = inputData.type.toLowerCase();

            inputData.id = modelId;

            const newModel = formatDataRow(inputData);

            let modelData = this.loadModelFile(modelType);

            const oldModelIndex = _.findIndex(modelData, { id: modelId });
            // Now insert the new record into modelData array
            const oldModel = modelData[oldModelIndex];
            const keys = Object.keys(oldModel);
            for (const key of keys) {
                if (newModel[key]) {
                    oldModel[key] = newModel[key];
                }
            }

            modelData[oldModelIndex] = oldModel;
            // here write to model file in json db directory
            this.writeModelFile(modelType, modelData);

            resolve(newModel);
        });
    }

    /**
     * Loads Model data from file system
     * @param {enum} modelType - carries model type "OWNER", "CAT" or "DOG"
     */
    loadModelFile(modelType) {

        const modelFilePath = path.join(dbDirectory, modelType) + '.json';
        if (!fs.existsSync(modelFilePath)) {
            return [];
        }

        const modelBuffer = fs.readFileSync(modelFilePath);

        const modelData = (modelBuffer && modelBuffer.length > 0) ? JSON.parse(modelBuffer) : [];

        return modelData;
    }

    /**
     * Rewrites the model file
     * @param {enum} modelType - carries "OWNER", "DOG" or "CAT"...etc
     * @param {object} modelData - carries model data fields
     */
    writeModelFile(modelType, modelData) {
        const modelFilePath = path.join(dbDirectory, modelType) + '.json';
        fs.writeFileSync(modelFilePath, JSON.stringify(modelData));
    }

    /**
     * Get all Owners
     */
    getOwners() {
        return this.loadModelFile('OWNER');
    }

    /**
     * Get all Dogs
     */
    getDogs() {
        return this.loadModelFile('DOG');
    }

    /**
     * Get all Cats
     */
    getCats() {
        return this.loadModelFile('CAT');
    }

    /**
     * Get all Pets
     */
    getPets() {
        const dogs = this.getDogs();
        const cats = this.getCats();
        let pets = [];
        pets = dogs.concat(cats);

        return pets;
    }

    /**
     * Gets array of pets that belong to specified Owner
     * @param {String} oId - carries owner id
     */
    ownerPets(oId) {
        const pets = this.getPets();
        const fPets = _.filter(pets, { ownerId: oId });

        return fPets;
    }

    /**
     * Gets Owner data with specified owner id
     * @param {String} oId - carries Owner id
     */
    getOwner(oId) {
        const owners = this.getOwners();
        const owner = _.find(owners, { id: oId });

        return owner;
    }

    /**
     * Gets Owner data with specified email
     * @param {String} oEmail - Owner email string
     */
    getOwnerByEmail(oEmail) {
        const owners = this.getOwners();
        const owner = _.find(owners, { email: oEmail });

        return owner;
    }

    /**
     * Gets the Pet with specified data fields
     * @param {object} input - carries pets data fields (input fields) entered when Query
     */
    getPet(input) {
        const pets = this.getPets();
        const pet = _.find(pets, input);

        return pet;
    }
}
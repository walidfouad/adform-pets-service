import { mdir, projectPath, pathJoin } from '../utils/path';
import uuidv4 from 'uuid/v4';
import Owner from '../model/owner/owner.model';
import Dog from '../model/pet/dog.model';
import Cat from '../model/pet/cat.model';

import formatData, { formatDataRow } from './dataformat';

import fs from 'fs';
import { load } from 'protobufjs';

const dbDirectory = projectPath('json_data');

export default class DbManager {

    constructor() {
        this.data = {};
    }

    readData() {
        return new Promise((resolve, reject) => {
            // read all json db files
            // here should update data from json files 


            resolve(this.data);
        });
    }

    writeData() {
        return new Promise((resolve, reject) => {
            // ensure db directory exists
            mdir(dbDirectory);
            // steps to save

            resolve(this.data);
        });

    }

    readModels(modelTypes) {
        return new Promise((resolve, reject) => {
            if (!modelTypes || modelTypes.length === 0) {
                return reject(new Error('No modelType provided.'));
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

    saveModel(inputData) {
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

    getOwners() {
        return loadModel('OWNER');
    }

    getDogs() {
        return loadModel('DOG');
    }

    getCats() {
        return loadModel('CAT');
    }

    loadModelFile(modelType) {

        const modelFilePath = pathJoin(dbDirectory, modelType) + '.json';
        if (!fs.existsSync(modelFilePath)) {
            return [];
        }

        const modelBuffer = fs.readFileSync(modelFilePath);

        const modelData = (modelBuffer && modelBuffer.length > 0) ? JSON.parse(modelBuffer) : [];

        return modelData;
    }

    writeModelFile(modelType, modelData) {
        const modelFilePath = pathJoin(dbDirectory, modelType) + '.json';
        fs.writeFileSync(modelFilePath, JSON.stringify(modelData));
    }
}
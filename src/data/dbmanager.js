import { mdir, projectPath, pathJoin } from '../utils/path';
import uuid from 'uuid/v4';
import Owner from '../model/owner/owner.model';
import Dog from '../model/pet/dog.model';
import Cat from '../model/pet/cat.model';

import formatData, { formatDataRow } from './dataformat';

import fs from 'fs';

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

                const mType = modelType.toLowerCase();

                const modelFilePath = pathJoin(dbDirectory, mType) + '.json';

                // check if model file already exists
                if (!fs.existsSync(modelFilePath)) {
                    return reject(new Error(`No data found for Model ${mType}.`));
                }

                // here read model file from json db directory
                const modelBuffer = fs.readFileSync(modelFilePath, (err) => {
                    if (err) {
                        return reject(new Error(
                            `Error reading model${mType}.
							Error details =>
							
							${err}
							`));
                    }
                });

                const modelData = (modelBuffer && modelBuffer.length > 0) ? JSON.parse(modelBuffer) : null;
                result = result.length === 0 ? result = modelData : result.concat(modelData);

            });

            resolve(result);
        });

    }

    writeModel(inputData) {
        return new Promise((resolve, reject) => {
            const modelType = inputData.type;
            const id = uuidv4();
            inputData.id = id;
            const newModel = formatDataRow(inputData);

            if (!modelType) {
                return reject(new Error('No modelType provided.'));
            }

            const mType = modelType.toLowerCase();

            if (!this.data || !this.data[mType]) {
                return reject(new Error(`No provided data for model${mType}.`));
            }

            const modelFilePath = pathJoin(dbDirectory, mType) + '.json';
            let modelData = [];
            // check if model file already exists
            if (fs.existsSync(modelFilePath)) {
                const modelBuffer = fs.readFileSync(modelFilePath, (err) => {
                    if (err) {
                        return reject(new Error(
                            `Error reading model${mType}.
							Error details =>
							
							${err}
							`));
                    }
                });

                modelData = JSON.stringify(modelBuffer);

            }
            // Now insert the new record into modelData array
            modelData.push(newModel);
            // here write to model file in json db directory

            fs.writeFileSync(modelFilePath, modelData, (err) = {
                if (err) {
                    return reject(new Error(
                        `Error writing to model${mType}.
						Error details =>
						
						${err}
						`));
                }

            });

            resolve(newModel);
        });
    }
}
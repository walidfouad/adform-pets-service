import { mdir, projectPath, pathJoin } from '../utils/path';
import fs from 'fs';

const dbDirectory = projectPath('json_data');

class PETSDB {

    constructor() {
        this.data = {};
    }

    loadData() {
        return new Promise((resolve, reject) => {
            // read json db files
            // here should update data from json files 


            resolve(this.data);
        });
    }

    saveData() {
        return new Promise((resolve, reject) => {
            // ensure db directory exists
            mdir(dbDirectory);
            // steps to save

            resolve(this.data);
        });

    }

    loadModel(modelType) {
        return new Promise((resolve, reject) => {
            if (!modelType) {
                return reject(new Error('No modelType provided to load/reload Model'));
            }

            const mType = modelType.toLowerCase();

            const modelFilePath = pathJoin(dbDirectory, mType);
            if (!fs.existsSync(modelFilePath)) {
                return reject(new Error(`no data found for Model ${mType}`));
            }

            // here read model file from json db directory
            const modelData = fs.readFileSync(modelJsonFile, (err) => {
                if (err) {
                    reject(new Error(
                        `Error reading model${mType}.
						Error details =>
						
						${err}
						`));
                }
            });
            this.data[mType] = JSON.parse(modelData);

            resolve(this.data[mType]);
        });

    }

    saveModel(modelType) {
        return new Promise((resolve, reject) => {
            if (!modelType) {
                reject(new Error('No modelType provided to save/write Model'));
            }

            const mType = modelType.toLowerCase();

            if (!this.data || !this.data[mType]) {
                return reject(new Error(`No provided data for model${mType}`));
            }

            const modelJsonFile = pathJoin(dbDirectory, mType);
            // here write to model file in json db directory
            const modelData = JSON.stringify(this.data[mType]);
            fs.writeFileSync(modelJsonFile, modelData, (err) = {
                if (err) {
                    reject(new Error(
                        `Error writing to model${mType}.
						Error details =>
						
						${err}
						`));
                }

            });
            resolve();
        });
    }
}
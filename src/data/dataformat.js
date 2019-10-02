import async from 'async';
import Owner from '../model/owner/owner.model';
import Dog from '../model/pet/dog.model';
import Cat from '../model/pet/cat.model';

/**
 * formats model data and creates instance according to its type
 * @param {object} dataRow - carries model field data
 */
const formatDataRow = (dataRow) => {
    let fDataRow = {};

    if (!dataRow.type) {
        logger.error('MISSING FIELD', 'Some records in database missing model type');
        return fDataRow;
    }

    switch (dataRow.type.toLowerCase()) {
        case 'owner':
            fDataRow = new Owner(dataRow.id,
                dataRow.name,
                dataRow.address,
                dataRow.email,
                dataRow.phone);
            break;
        case 'dog':
            fDataRow = new Dog(dataRow.id,
                dataRow.name,
                dataRow.colour,
                dataRow.age,
                dataRow.breed,
                dataRow.ownerId);
            break;
        case 'cat':
            fDataRow = new Cat(dataRow.id,
                dataRow.name,
                dataRow.colour,
                dataRow.age,
                dataRow.breed,
                dataRow.ownerId);
            break;
        default:
            return {};

    }

    // verify it is finally converted to json format
    return fDataRow.toJSON();
};

/**
 * formats models data and creates instances according to its type
 * this could be extended to allow for sorting and different kinds of formatting
 * @param {array} modelDataArray - an array of models
 */
const formatData = (modelDataArray) => {

    let formatedDataArray = [];
    async.forEach(modelDataArray, (modelDataRow) => {
        formatedDataArray.push(formatDataRow(modelDataRow));
    });

    // sort by id
    // formatedDataArray.sort((a, b) => (a.id > b.id) ? 1 : -1);

    // sort by id and then by type
    formatedDataArray.sort((a, b) => (a.id > b.id) ? 1 : (a.type === b.type) ? 1 : -1);

    return formatedDataArray;
};

export { formatDataRow };
export default formatData;
import Owner from '../model/owner/owner.model';
import Dog from '../model/pet/dog.model';
import Cat from '../model/pet/cat.model';

import async from 'async';

const formatDataRow = (dataRow) => {
    let fDataRow = {};

    if (!dataRow.type) {
        console.log('MISSING FILED. Data row does not include a type.');

        return fDataRow;
    }

    switch (dataRow.type.toLowerCase()) {
        case 'owner':
            fDataRow = new Owner(dataRow.id,
                dataRow.name,
                dataRow.address,
                dataRow.phone,
                dataRow.email);
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

    return fDataRow.toJSON();
};


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
import _ from 'lodash';

const customSort = (items, sortBy) => {
    let res = [];
    for (let i = 0; i < sortBy.length; i++) {
        const sortObject = sortBy[i];

        for (const key in sortObject) {
            if (!sortObject.hasOwnProperty(key)) {
                continue;
            }
            let tempArr = [];
            // custom sort entity
            const sortItem = sortObject[key];

            // if not string breaks next steps
            if (_.isFunction(sortItem)) {
                const resultCallback = sortItem(items, key);

                return _.concat(res, resultCallback);
            }
            // sorts by splitted string (clears items) for next steps "custom sort"
            if (_.isArray(sortItem)) {
                _.each(sortItem, value => {
                    const findObject = {};

                    findObject[key] = value;
                    const finded = _.find(items, findObject);

                    if (finded) {
                        tempArr.push(finded);

                        // remove just added item for accelerating next steps
                        items.splice(_.findIndex(items, findObject), 1);
                    }
                });

                res = _.concat(res, tempArr);
            }
        }
    }
    // prepends items which left after "custom sort"
    return _.concat(res, items);
}

module.exports = customSort;

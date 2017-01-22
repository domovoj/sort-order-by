'use strict';

var _findIndex2 = require('lodash/findIndex');

var _findIndex3 = _interopRequireDefault(_findIndex2);

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _concat2 = require('lodash/concat');

var _concat3 = _interopRequireDefault(_concat2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customSort = function customSort(items, sortBy) {
    var res = [];
    for (var i = 0; i < sortBy.length; i++) {
        var sortObject = sortBy[i];

        var _loop = function _loop(key) {
            if (!sortObject.hasOwnProperty(key)) {
                return 'continue';
            }
            var tempArr = [];
            // custom sort entity
            var sortItem = sortObject[key];

            // if not string breaks next steps
            if ((0, _isFunction3.default)(sortItem)) {
                var resultCallback = sortItem(items, key);

                return {
                    v: (0, _concat3.default)(res, resultCallback)
                };
            }
            // sorts by splitted string (clears items) for next steps "custom sort"
            if ((0, _isArray3.default)(sortItem)) {
                (0, _each3.default)(sortItem, function (value) {
                    var findObject = {};

                    findObject[key] = value;
                    var finded = (0, _find3.default)(items, findObject);

                    if (finded) {
                        tempArr.push(finded);

                        // remove just added item for accelerating next steps
                        items.splice((0, _findIndex3.default)(items, findObject), 1);
                    }
                });

                res = (0, _concat3.default)(res, tempArr);
            }
        };

        for (var key in sortObject) {
            var _ret = _loop(key);

            switch (_ret) {
                case 'continue':
                    continue;

                default:
                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
        }
    }
    // prepends items which left after "custom sort"
    return (0, _concat3.default)(res, items);
};

module.exports = customSort;

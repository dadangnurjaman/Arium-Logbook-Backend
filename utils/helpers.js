// utils/helpers.js

module.exports = {
    formatDate: (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    },
    isEmptyObject: (obj) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    },
};

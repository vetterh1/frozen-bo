// Necessary to testing monggose with jest
// see: https://mongoosejs.com/docs/jest.html

exports.setTimeout = function() {
    return global.setTimeout.apply(global, arguments);
  };
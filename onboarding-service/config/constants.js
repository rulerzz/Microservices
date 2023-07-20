var path = require('path');

module.exports = {
    WINSTON_FILE_NAME : "combined.log",
    WINSTON_ERROR_FILE_NAME: "error.log",
    WINSTON_DIR_NAME: path.join(__dirname, '../logs/'),
};

var errors = {};


errors.NOT_FOUND={'code':404 , 'reason':'Not Found'};

errors.INVALID_DATA={'code':411 , 'reason':'Invalid Data'};

errors.NO_RESPONSE={'code':551 , 'reason':'No Core to destenation'};

errors.INVALID_ID={'code':552 , 'reason':'Invalid record ID'};

errors.INTERNAL_ERROR={'code':570 , 'reason':'Server internal error'};

module.exports = errors;
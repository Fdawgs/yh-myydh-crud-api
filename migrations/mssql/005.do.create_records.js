"use strict";

// eslint-disable-next-line func-names
module.exports.generateSql = function () {
	return `INSERT INTO ${process.env.DB_PATIENT_PREFERENCES_TYPE_TABLE}
        (preference_type)
    VALUES
        ('SMS'),
        ('Email'),
        ('Phone'),
        ('Letters');
    
    INSERT INTO ${process.env.DB_PATIENT_PREFERENCES_VALUE_TABLE}
        (preference_value)
    VALUES
        ('yes'),
        ('no');`;
};

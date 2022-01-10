module.exports.generateSql = function () {
	return `INSERT INTO ${
		process.env.DB_PATIENT_PREFERENCES_TYPE_TABLE ||
		"myydh_crud_api.lookup.preference_type"
	}
        (preference_type)
    VALUES
        ('SMS'),
        ('Email'),
        ('Phone'),
        ('Letters');
    
    INSERT INTO ${
		process.env.DB_PATIENT_PREFERENCES_VALUE_TABLE ||
		"myydh_crud_api.lookup.preference_value"
	}
        (preference_value)
    VALUES
        ('yes'),
        ('no');`;
};
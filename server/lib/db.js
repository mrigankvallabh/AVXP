const { connect } = require("mongoose");

module.exports.connect = async dsn => connect(dsn);
const { gql } = require('apollo-server-express');
const { authCheck } = require('../helpers/auth');

const me = (parent, args, {req, res}) => {
  authCheck(req, res);
  return 'Ryan';
};

module.exports = {
  Query: {
    me
  }
};
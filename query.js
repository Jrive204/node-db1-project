const db = require('./data/dbConfig');

module.exports = {
  getstuff(query) {
    const data = db('accounts');
    if (query.sortby) {
      data.orderBy(query.sortby, query.sortdir);
    }
    if (query.limit && query.limit >= 1) {
      data.limit(query.limit);
    }
    return data;
  }
};

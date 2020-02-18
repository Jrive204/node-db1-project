const express = require('express');

const db = require('./data/dbConfig.js');
const query = require('./query');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
  const { limit, sortby, sortdir } = req.query;
  console.log(req.query, 'HELLO');

  query
    .getstuff({ limit, sortby, sortdir })
    .then(
      accounts => res.status(200).json(accounts) & console.log(accounts.length)
    )
    .catch(err => res.status(500).json(err.message));
});

server.get('/api/accounts/:id', (req, res) => {
  const { id } = req.params;
  db('accounts')
    .where({ id })
    .first()
    .then(account => res.status(200).json(account))
    .catch(err => res.status(500).json(err.message));
});
//  POST --------

server.post('/api/accounts', (req, res) => {
  db('accounts')
    .insert(req.body, 'id')
    .then(account => res.status(201).json(account))
    .catch(err => res.status(500).json(err.message));
});

//  PUT -----------------------

server.put('/api/accounts/:id', (req, res) => {
  const { id } = req.params;
  db('accounts')
    .where({ id })
    .update(req.body)
    .then(account => res.status(200).json(account))
    .catch(err => res.status(500).json(err.message));
});

// DELETE  ---------

server.delete('/api/accounts/:id', (req, res) => {
  const { id } = req.params;
  db('accounts')
    .where({ id })
    .delete()
    .then(account => res.status(200).json(account))
    .catch(err => res.status(500).json(err.message));
});

module.exports = server;

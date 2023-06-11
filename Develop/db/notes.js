const uuid = require('./helpers/uuid.js');

const notes = [
  {
      "title":"Fun",
      "text":"Sun",
      "id":uuid()
  },
  {
      "title":"Study Java Script",
      "text":"Try to understand apis",
      "id":uuid()
  }
]

module.exports = notes;
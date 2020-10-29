const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true,
    validate: {
      validator: function (hexValue) {
        return /^#([A-Fa-f0-9]{6})$/.test(hexValue);
      },
      message: props => `${props.value} is not a hex value`
    },
  }
}, {collection: 'Budget'});

module.exports = mongoose.model('Budget', BudgetSchema);
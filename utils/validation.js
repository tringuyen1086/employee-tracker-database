const validator = require("validator");

const validate = {
  checkNumber(salaryInput) {
    if (validator.isDecimal(salaryInput)) return true;
    return "Salary format invalid. Please enter in this format: 50000.00";
  },

  isEqual(entry1, entry2) {
    if (entry1 === entry2) return true;
  },
};

module.exports = validate;

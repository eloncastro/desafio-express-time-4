const path = require('path');
const fs = require('fs');

const adminController = {
    index: (req, res) => {
      res.render('admin', {title: "Admin"});
    }
}

module.exports = adminController;
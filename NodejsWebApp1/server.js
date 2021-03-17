"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const parser = require("body-parser");
const jsonParser = parser.json();
const app = express();
var staticSiteOptions = {
    portnum: process.env.PORT || 5000
};
app.use(express.static(path.join(__dirname, 'static'), staticSiteOptions));
var base = [{ name: "Martin", b_date: "2023-02-23", perfomance: 3 }];
function find_student(name, b_date, callback) {
    if (base.length != 0) {
        base.forEach((item, index) => {
            if ((item.name.toLowerCase() == name.toLowerCase()) && (item.b_date == b_date)) {
                callback(index + 1);
                return;
            }
            if (index == base.length - 1)
                callback(false);
        });
    }
    else
        callback(false);
}
function add_student(student, callback) {
    find_student(student.name, student.b_date, function (index) {
        if (!index) {
            callback(true);
            base.push({ name: student.name, b_date: student.b_date, perfomance: student.perfomance });
        }
        else {
            callback(false);
        }
    });
}
function delete_student(student, callback) {
    find_student(student.name, student.b_date, function (index) {
        if (index) {
            base.splice(index - 1, 1);
            callback(true);
        }
        else {
            callback(false);
        }
    });
}
function edit_student(student, callback) {
    find_student(student[1].name, student[1].b_date, function (index) {
        if (index) {
            base[index - 1].name = student[0].name;
            base[index - 1].b_date = student[0].b_date;
            base[index - 1].perfomance = student[0].perfomance;
            callback(true);
        }
        else {
            callback(false);
        }
    });
}
app.post('/get_all', jsonParser, function (req, res) {
    res.send(base);
});
app.post('/add_student', jsonParser, function (req, res) {
    add_student(req.body, function (ans) {
        res.send(ans);
    });
});
app.post('/delete_student', jsonParser, function (req, res) {
    delete_student(req.body, function (ans) {
        res.send(ans);
    });
});
app.post('/edit_student', jsonParser, function (req, res) {
    edit_student(req.body, function (ans) {
        res.send(ans);
    });
});
app.listen(staticSiteOptions.portnum, function () {
    console.log("listen");
});
//# sourceMappingURL=server.js.map
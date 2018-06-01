"use strict";

var WorkReportItem = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.key = obj.key;
        this.content = obj.content;
        this.name = obj.name;
        this.time = obj.time;
        this.ratio = obj.ratio;
        this.date=obj.date;
    } else {
        this.key = "";
        this.content = "";
        this.name = "";
        this.time = "";
        this.ratio = "";
        this.date="";
    }
};
WorkReportItem.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};
var WorkReport = function () {
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (text) {
            return new WorkReportItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

WorkReport.prototype = {
    init: function () {
        // init
    },
    save: function (name, content, ratio, time,date) {
        var from = Blockchain.transaction.from;
        var workReportItem = this.repo.get(from);
        if (workReportItem) {
            workReportItem.name = JSON.parse(workReportItem).name + '|-' + name;
            workReportItem.content = JSON.parse(workReportItem).content + '|-' + content;
            workReportItem.ratio = JSON.parse(workReportItem).ratio + '|-' + ratio;
            workReportItem.time = JSON.parse(workReportItem).time + '|-' + time;
            workReportItem.date = JSON.parse(workReportItem).date + '|-' + date;
            this.repo.put(from, workReportItem);

        } else {
            workReportItem = new WorkReportItem();
            workReportItem.key = from;
            workReportItem.content = content;
            workReportItem.name = name;
            workReportItem.time = time;
            workReportItem.ratio = ratio;
            workReportItem.date=date;
            this.repo.put(from, workReportItem);
        }
    },
    get: function (key) {
        var from = Blockchain.transaction.from;
        return this.repo.get(from);
    }
};
module.exports = WorkReport;
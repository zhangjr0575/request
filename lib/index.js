!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.tools = t() : e.tools = t()
}(this, (function () {
    return e = {
        607: e => {
            var t = function (e, t, o) {
                this.firstName = e, this.middleInitial = t, this.lastName = o, this.fullName = e + " " + t + " " + o
            };
            e.exports.main = {
                greeter: function (e) {
                    var o = new t("Jane", "M.", "User");
                    return console.log(o), "Hello, " + e.firstName + " " + e.lastName
                }
            }
        }
    }, t = {}, function o(r) {
        var n = t[r];
        if (void 0 !== n) return n.exports;
        var i = t[r] = {exports: {}};
        return e[r](i, i.exports, o), i.exports
    }(607);
    var e, t
}));

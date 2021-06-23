module.exports = function getFullURL(url, baseURL) {
    return /^http/.test(url) ? url : (baseURL + (~url.indexOf("/") ? "" : "/") + url);
}

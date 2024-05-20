exports.singupPage = (req, res, next) => {
    res.render('index',{footer: false});
}

exports.loginPage = (req, res, next) => {
    res.render("login", {footer: false});
}

exports.profilePage = (req, res, next) => {
    res.render("profile", {footer: true});
}

exports.feedPage = (req, res, next) => {
    res.render("feed", {footer: true});
}

exports.editPage = (req, res, next) => {
    res.render("edit", {footer: true});
}

exports.searchPage = (req, res, next) => {
    res.render("search", {footer: true});
}

exports.uploadPage = (req, res, next) => {
    res.render("upload", {footer: true});
}
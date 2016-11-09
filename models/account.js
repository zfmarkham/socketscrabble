/**
 * Created by zmark_000 on 08/11/2016.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
    username: String,
    password: String,
    activeGames: Array
}) ;

Account.plugin(passportLocalMongoose);

//module.exports = mongoose.model('Account', Account);
module.exports.Account = mongoose.model('Account', Account); // Exporting this way makes intellisense work on models. Known bug with Webstorm. https://youtrack.jetbrains.com/issue/WEB-17099
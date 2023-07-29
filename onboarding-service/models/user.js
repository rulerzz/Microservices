const { randomUUID } = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 5,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        required: true
    },
    subjects: {
        type: Array,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    agree: {
        type: Boolean,
        required: true
    },
    uuid: {
        type: 'UUID',
        default: () => randomUUID(),
        required: true
    }
});

userSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });


});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
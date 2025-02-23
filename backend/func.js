"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomString = randomString;
function randomString() {
    const letter = '3456783245676asdbdsgfhibsdfasfadfadssofse';
    const size = letter.length;
    let randomString = "";
    for (let i = 0; i < 10; i++) {
        randomString += letter[Math.floor(Math.random()) + 1];
    }

}
randomString();

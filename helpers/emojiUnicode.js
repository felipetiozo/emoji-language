function emojiUnicode (input) {
    return emojiUnicode.raw(input).toString("16");
}

emojiUnicode.raw = function (input) {
    if (input.length === 1) {
        return input.charCodeAt(0);
    }
    let comp = (
        (input.charCodeAt(0) - 0xD800) * 0x400
      + (input.charCodeAt(1) - 0xDC00) + 0x10000
    );
    if (comp < 0) {
        return input.charCodeAt(0);
    }
    return comp;
};

module.exports = emojiUnicode;
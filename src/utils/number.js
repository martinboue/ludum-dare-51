Number.prototype.pad = function(char, size) {
    return String(this).padStart(size, char);
};
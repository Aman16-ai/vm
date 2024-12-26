class Logger {
    info(message) {
        console.log(`[INFO] ${message}`);
    }

    error(message) {
        console.error(`[ERROR] ${message}`);
    }
}

module.exports = Logger
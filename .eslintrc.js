module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["airbnb-base", "airbnb-babel"],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "globals": {
        "Phaser": "readonly"
    },
    "settings": {
        "import/core-modules": ["phaser"]
    },
    "rules": {
        "indent": ["error", 4],
        "eol-last": ["error", "never"],
        "no-plusplus": ["off"],
        "class-methods-use-this": ["off"],
        "max-len": ["error", 170],
        "no-nested-ternary": ["off"]
    }
};
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "standard-with-typescript",
        "prettier",
        "plugin:react/jsx-runtime"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "tsconfigRootDir": __dirname,
        "project": ["./tsconfig.json"],
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off"
    },
    "ignorePatterns": [
        "*.svg",
        "*.css"
    ]
}

const config = {
    extends: ['next'],
    plugins: ['import', 'unused-imports'],
    rules: {
        'no-prototype-builtins': 'off',
        'no-undef': 'off',
        'no-useless-escape': 'off',
        'no-shadow': 'error',
        'no-empty': ['error', { 'allowEmptyCatch': true }],
        'comma-dangle': ['error', {
            'arrays': 'never',
            'objects': 'ignore',
            'imports': 'never',
            'exports': 'never',
            'functions': 'never'
        }],
        'indent': ['error', 4, {
            'SwitchCase': 1,
            ignoredNodes: ['TemplateLiteral']
        }],
        'key-spacing': ['error', { 'beforeColon': false }],
        'object-curly-spacing': ['error', 'always'],
        'semi': 'error',
        'no-extra-semi': 'error',
        'max-len': ['error', {
            'code': 120,
            'ignoreStrings': true,
            'ignoreRegExpLiterals': true
        }],
        'quotes': ['error', 'single'],
        'jsx-quotes': ['error', 'prefer-double'],
        'space-before-blocks': 'error',
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
        'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
        'keyword-spacing': 'error',
        'arrow-spacing': 'error',
        'space-infix-ops': 'error',
        'import/order': ['error', {
            'newlines-between': 'always',
            'groups': [
                'builtin',
                'external',
                ['internal', 'parent', 'sibling'],
                'index',
                'object',
                'type'
            ],
            'pathGroups': [
                {
                    'pattern': '@magento/**',
                    'group': 'external',
                    'position': 'after'
                },
                {
                    'pattern': '@spectra/**',
                    'group': 'internal',
                    'position': 'before'
                }
            ],
            'pathGroupsExcludedImportTypes': ['builtin']
        }],
        'react/jsx-indent': ['error', 4, {
            'checkAttributes': true
        }],
        'react/jsx-wrap-multilines': ['error', {
            'declaration': 'parens-new-line',
            'assignment': 'parens-new-line',
            'return': 'parens-new-line',
            'arrow': 'parens-new-line',
            'condition': 'parens-new-line',
            'logical': 'parens-new-line',
            'prop': 'parens-new-line'
        }],
        'react/jsx-one-expression-per-line': ['error', { 'allow': 'single-child' }],
        'react/jsx-max-props-per-line': ['error', { 'maximum': { 'single': 2, 'multi': 1 } }],
        // 'react/prop-types': ['warn'],
        'react/jsx-tag-spacing': ['error', {
            'closingSlash': 'never',
            'beforeSelfClosing': 'never',
            'afterOpening': 'never',
            'beforeClosing': 'never'
        }],
        'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'error',
            { 'vars': 'all', 'varsIgnorePattern': '^_', 'args': 'after-used', 'argsIgnorePattern': '^_' }
        ]
    }
};

module.exports = config;

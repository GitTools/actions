// @ts-check

import eslint from '@eslint/js'
import eslintTs from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import vitest from '@vitest/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

export default [
    {
        files: ['src/**/*.ts']
    },
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                project: ['./tsconfig.json', './tsconfig.eslint.json'],
                tsconfigRootDir: import.meta.dirname,
                globals: { ...globals.node }
            }
        },
        plugins: {
            '@stylistic': stylistic,
            vitest
        }
    },
    eslint.configs.recommended,
    ...eslintTs.configs.recommendedTypeChecked,
    {
        rules: {
            ...vitest.configs.recommended.rules,
            'no-constant-condition': [
                'error',
                {
                    checkLoops: false
                }
            ],

            'no-shadow': 'off',
            'no-console': 'off',
            'no-sequences': 'off',
            'no-undef': 'off',

            '@stylistic/semi': ['error', 'never'],
            '@stylistic/type-annotation-spacing': 'error',
            '@stylistic/function-call-spacing': ['error', 'never'],

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_'
                }
            ],
            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                {
                    accessibility: 'no-public'
                }
            ],
            '@typescript-eslint/no-require-imports': 'error',
            '@typescript-eslint/array-type': 'error',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/ban-ts-comment': 'error',
            '@typescript-eslint/camelcase': 'off',
            '@typescript-eslint/consistent-type-assertions': 'off',
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                {
                    allowExpressions: true
                }
            ],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    format: null,
                    filter: {
                        // you can expand this regex as you find more cases that require quoting that you want to allow
                        regex: '^[A-Z][A-Za-z]*$',
                        match: true
                    },
                    selector: 'memberLike'
                }
            ],
            '@typescript-eslint/no-array-constructor': 'error',
            '@typescript-eslint/no-empty-interface': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-extraneous-class': 'error',
            '@typescript-eslint/no-for-in-array': 'error',
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/no-misused-new': 'error',
            '@typescript-eslint/no-namespace': 'error',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-unnecessary-qualifier': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@typescript-eslint/no-useless-constructor': 'error',
            '@typescript-eslint/no-var-requires': 'error',
            '@typescript-eslint/prefer-for-of': 'warn',
            '@typescript-eslint/prefer-function-type': 'warn',
            '@typescript-eslint/prefer-includes': 'error',
            '@typescript-eslint/prefer-string-starts-ends-with': 'error',
            '@typescript-eslint/promise-function-async': 'error',
            '@typescript-eslint/require-array-sort-compare': 'error',
            '@typescript-eslint/unbound-method': 'error',

            'vitest/expect-expect': [
                'error',
                {
                    assertFunctionNames: ['expect', 'expectValidSettings']
                }
            ]
        }
    },
    eslintPluginPrettier,
    eslintConfigPrettier,
    {
        rules: {
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto'
                }
            ]
        }
    }
]

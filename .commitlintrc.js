module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'style',
        'test',
        'refactor',
        'docs',
        'chore',
        'build',
        'perf',
        'ci',
        'release',
        'revert',
      ],
    ],
  },
}

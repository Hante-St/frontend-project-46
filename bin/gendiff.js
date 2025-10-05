#!/usr/bin/env node

import { Command } from 'commander'
import { genDiff } from '../src/utils.js'

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
.argument('<filepath1>', 'Путь к первому файлу')
.argument('<filepath2>', 'Путь ко второму файлу')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
    const result = genDiff(filepath1, filepath2, options.format)
    console.log(result)
  })

program.on('--help', () => {
})

program.parse(process.argv)
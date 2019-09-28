const fs = require('fs')
const iconv = require('iconv-lite')

const LINE_SEPARATOR = '\n'
const CSV_DELIMITER = ','
const TSV_DELIMITER = '\t'

const inputPath = process.argv[2]
const outputPath = process.argv[3]

const tsv = read(inputPath)
const tsvLines = tsv.split(LINE_SEPARATOR).filter(line => line !== '')  // Skip empty lines
console.log(`read ${tsvLines.length} lines from ${inputPath}`)

const csvLines = tsvLines.map(line => {
  const tsvCells = line.split(TSV_DELIMITER)
  const csvCells = tsvCells.map(cell => `"${cell}"`)
  return csvCells.join(CSV_DELIMITER)
})
const csv = csvLines.join(LINE_SEPARATOR)
write(outputPath, csv)
console.log(`write ${csvLines.length} lines to ${outputPath}`)

function read (path) {
  return fs.readFileSync(path, 'utf-8')
}

function write (path, data) {
  fs.writeFileSync(path, iconv.encode(data, 'shift_jis'))
}

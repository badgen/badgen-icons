'use strict'

const { readdirSync, readFileSync, writeFileSync } = require('fs')
const { join, parse } = require('path')

const noneSquareIconWidths = {
  awesome: 20,
  codeclimate: 18,
  commonwl: 10,
  devrant: 12,
  lgtm: 19,
  now: 15,
  npm: 20,
  peertube: 10,
  zeit: 15
}

const generateIcons = iconFolder => readdirSync(iconFolder).reduce((icons, filename) => {
  const { name, ext } = parse(filename)
  const imageType = {
    '.svg': 'svg+xml',
    '.png': 'png'
  }[ext]

  if (!imageType) return icons

  const iconFile = join(iconFolder, filename)
  const svgSource = readFileSync(iconFile, 'utf8')
  const b64 = Buffer.from(svgSource).toString('base64')

  icons[name] = {
    base64: `data:image/${imageType};base64,${b64}`,
    width: noneSquareIconWidths[name] || 13,
    height: 13
  }
  return icons
}, {})

const inputDir = join(__dirname, 'icons')
const outFile = join(__dirname, 'icons.json')

const icons = generateIcons(inputDir)
const json = JSON.stringify(icons, null, 2)

writeFileSync(outFile, json)

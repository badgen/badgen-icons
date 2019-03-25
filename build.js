const fs = require('fs')
const { join, parse } = require('path')

const noneSquareIconWidths = {
  awesome: 20,
  codeclimate: 18,
  commonwl: 10,
  lgtm: 19
}

const genIcons = (iconFolder) => {
  const icons = {}

  fs.readdirSync(join(__dirname, iconFolder)).forEach(filename => {
    const imageType = {
      '.svg': 'svg+xml',
      '.png': 'png'
    }[parse(filename).ext]

    if (!imageType) return

    const key = parse(filename).name
    const iconFile = join(__dirname, iconFolder, filename)
    const svgSource = fs.readFileSync(iconFile, 'utf8')
    const b64 = Buffer.from(svgSource).toString('base64')

    icons[key] = {
      base64: `data:image/${imageType};base64,${b64}`,
      width: noneSquareIconWidths[key] || 13,
      height: 13
    }
  })

  return icons
}

const icons = genIcons('icons')
const json = JSON.stringify(icons, null, 2)

fs.writeFileSync('index.js', `module.exports = ${json}`)

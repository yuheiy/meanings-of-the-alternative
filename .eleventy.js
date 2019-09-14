const { url } = require('./src/_data/_universalFilters')
const pkg = require('./package.json')

module.exports = (eleventyConfig) => {
  eleventyConfig.addPairedLiquidShortcode('slide', (content, index, alt) => {
    const imagePath = url(
      `/assets/${pkg.name}.${String(index).padStart(3, 0)}.png`,
    )
    const imageHTML = `<div class="center"><img src="${imagePath}" width="1920" height="1080" alt="${alt}" decoding="async" loading="lazy"></div>`
    const normalizedContent = content.replace(/^\n+|\n+$/g, '')
    const captionHTML =
      normalizedContent &&
      `<figcaption class="center -readable">
<div class="stack -small">${normalizedContent}</div>
</figcaption>`

    return `<figure class="stack -small">
${imageHTML}
${captionHTML}
</figure>`
  })

  eleventyConfig.addPassthroughCopy('src/assets')

  eleventyConfig.setBrowserSyncConfig({ ghostMode: false })

  return {
    dir: {
      input: 'src',
      output: 'docs',
    },
    pathPrefix: `/${pkg.name}/`,
  }
}

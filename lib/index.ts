import chroma, { Color, InterpolationMode } from 'chroma-js'

import { ColorRange, PaletteOptions } from '../types'

export = function (color: string, options: PaletteOptions = {}) {
	if (!color || typeof color !== 'string') {
		throw new Error('Please provide a valid "color" string parameter')
	}
	const colorChroma = chroma(color)
	const colorScale: Array<number|string> = [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ]
	const { name = 'brand', ui = false, uiMix = 0.2, grayscale = false, grayscaleMix = 0.03, palette = {}, colorscale = colorScale, scalemode = "rgb" } = options

	function mix (baseColor: Color | string, amount: number): string {
		return chroma.mix(baseColor, colorChroma, amount, 'lab').hex()
	}

	function addToPalette (name: string, value: string | ColorRange) {
		if (!palette[name]) {
			palette[name] = value
		}
	}

  function scalePalette (baseColor: Color | string, suffixes: Array<string|number>, scalemode: InterpolationMode = "rgb", padding: number = 0.1): ColorRange {
		const colorscale = chroma.scale([ 'white', baseColor, 'black' ]).mode(scalemode).padding(padding).colors(suffixes.length)
		const colorRange: ColorRange = {}
		suffixes.forEach((suffix, index) => colorRange[suffix] = colorscale[index])
		return colorRange
	}

	addToPalette(name, scalePalette(colorChroma, colorscale, scalemode))

	// UI Colors https://github.com/adevade/color-scheme-generator
	if (ui) {
		addToPalette('cta',     scalePalette(colorChroma.set('hsl.h', '+150'), colorscale, scalemode))
		addToPalette('info',    scalePalette(mix('#3df', uiMix), colorscale, scalemode))
		addToPalette('warning', scalePalette(mix('#fd0', uiMix), colorscale, scalemode))
		addToPalette('success', scalePalette(mix('#3e4', uiMix), colorscale, scalemode))
		addToPalette('danger',  scalePalette(mix('#f34', uiMix), colorscale, scalemode))
	}

	// Grayscale
	if (grayscale) {
		//addToPalette('white', '#fff')
		addToPalette('white', mix('#fff', grayscaleMix))
		addToPalette('black', mix('#000', grayscaleMix))
		addToPalette('transparent', 'transparent')
		addToPalette('gray', scalePalette(mix('#adadad', grayscaleMix), colorscale, scalemode))
	}
	return palette
}

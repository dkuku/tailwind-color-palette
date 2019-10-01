import {InterpolationMode} from 'chroma-js';

export interface ColorPalette {
  [key: string]: any
}

export interface PaletteOptions {
	name?: string
	ui?: boolean
	uiMix?: number
	grayscale?: boolean
	grayscaleMix?: number
	palette?: ColorPalette
  colorscale?: Array<string|number>
  scalemode?: InterpolationMode
}

export interface ColorRange {
  [key: string]: string
} 

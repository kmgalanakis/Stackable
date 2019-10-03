/**
 * BLOCK: Feature Block.
 */

/**
 * Internal dependencies
 */
import deprecated from './deprecated'

/**
 * External dependencies
 */
import {
	descriptionPlaceholder, createImageAttributes, createBackgroundAttributes, createTypographyAttributes, createButtonAttributes, createResponsiveAttributes, createAllCombinationAttributes,
} from '~stackable/util'
import edit from './edit'
import { FeatureIcon } from '~stackable/icons'
import save from './save'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { disabledBlocks, i18n } from 'stackable'
import { applyFilters } from '@wordpress/hooks'

export const schema = {
	design: {
		type: 'string',
		default: 'plain',
	},
	...createResponsiveAttributes( 'imageColumn%sWidth', {
		type: 'number',
		default: '',
	} ),
	...createResponsiveAttributes( 'container%sWidth', {
		type: 'number',
		default: '',
	} ),
	...createResponsiveAttributes( 'container%sOffset', {
		type: 'number',
		default: '',
	} ),
	invert: {
		type: 'boolean',
		default: false,
	},
	borderRadius: {
		type: 'number',
		default: 12,
	},
	shadow: {
		type: 'number',
		default: 3,
	},

	// Background.
	...createBackgroundAttributes( 'column%s' ),

	// Image.
	...createImageAttributes( 'image%s' ),
	imageUrl: {
		type: 'string',
		default: '',
	},
	imageShapeStretch: {
		type: 'boolean',
		default: true,
	},
	...createResponsiveAttributes( 'imageBackground%sHeight', {
		type: 'number',
		default: '',
	} ),

	// Title.
	title: {
		source: 'html',
		selector: '.ugb-feature__title',
		default: __( 'Title for This Block', i18n ),
	},
	showTitle: {
		type: 'boolean',
		default: true,
	},
	titleTag: {
		type: 'string',
		defualt: '',
	},
	...createTypographyAttributes( 'title%s' ),
	titleColor: {
		type: 'string',
		default: '',
	},

	// Description.
	description: {
		source: 'html',
		selector: '.ugb-feature__description',
		default: descriptionPlaceholder( 'medium' ),
	},
	showDescription: {
		type: 'boolean',
		default: true,
	},
	...createTypographyAttributes( 'description%s' ),
	descriptionColor: {
		type: 'string',
		defualt: '',
	},

	// Button.
	showButton: {
		type: 'boolean',
		default: true,
	},
	...createButtonAttributes( 'button%s', { selector: '.ugb-button' } ),

	// Spacing.
	...createResponsiveAttributes( 'title%sBottomMargin', {
		type: 'number',
		default: '',
	} ),
	...createResponsiveAttributes( 'description%sBottomMargin', {
		type: 'number',
		default: '',
	} ),
	...createResponsiveAttributes( 'button%sBottomMargin', {
		type: 'number',
		default: '',
	} ),

	// Alignments.
	...createAllCombinationAttributes(
		'%s%sAlign', {
			type: 'string',
			default: '',
		},
		[ 'Title', 'Description', 'Button' ],
		[ '', 'Tablet', 'Mobile' ]
	),

	// Effects.
	hoverEffect: {
		type: 'string',
		default: '',
	},
}

export const name = 'ugb/feature'

export const settings = {
	title: __( 'Feature', i18n ),
	description: __( 'Display a product feature or a service in a large area.', i18n ),
	icon: FeatureIcon,
	category: 'stackable',
	keywords: [
		__( 'Feature', i18n ),
		__( 'Stackable', i18n ),
	],
	supports: {
		align: [ 'center', 'wide', 'full' ],
		inserter: ! disabledBlocks.includes( name ), // Hide if disabled.
	},

	deprecated,
	edit,
	save,

	attributes: schema,

	// Stackable modules.
	modules: {
		'advanced-block-spacing': true,
		// 'advanced-column-spacing': {
		// 	columnGap: false,
		// },
		'advanced-responsive': true,
		'block-background': true,
		'block-separators': true,
		// 'block-title': true,
		'content-align': true,
		'custom-css': {
			default: applyFilters( 'stackable.feature.custom-css.default', '' ),
		},
	},
}

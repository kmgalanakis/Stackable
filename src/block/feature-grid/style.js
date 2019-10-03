/**
 * External dependencies
 */
import {
	createBackgroundStyleSet,
	createButtonStyleSet,
	createTypographyStyles,
	whiteIfDark,
	createImageStyleSet,
	marginLeftAlign,
	marginRightAlign,
	createImageMask,
	createResponsiveStyles,
} from '~stackable/util'
import { range } from 'lodash'

/**
 * Internal dependencies
 */
import { showOptions } from './util'
import deepmerge from 'deepmerge'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import { sprintf } from '@wordpress/i18n'

export const createStyles = props => {
	const getValue = ( attrName, format = '' ) => {
		const value = typeof props.attributes[ attrName ] === 'undefined' ? '' : props.attributes[ attrName ]
		return value !== '' ? ( format ? sprintf( format, value ) : value ) : undefined
	}

	const show = showOptions( props )

	const {
		columns = 3,
		columnBackgroundColor = '',
		showImage = true,
		contentAlign = '',
	} = props.attributes

	const styles = []

	if ( show.columnBackground ) {
		styles.push( {
			'.ugb-feature-grid__item': {
				borderRadius: getValue( 'borderRadius', '%spx !important' ),
			},
		} )
	}

	// Column Background.
	const columnBackgroundSelector = applyFilters( 'stackable.feature-grid.styles.column-background', 'ugb-feature-grid__item', props.attributes )
	styles.push( {
		...( show.columnBackground ? createBackgroundStyleSet( 'column%s', columnBackgroundSelector, props.attributes, {
			importantBackgroundColor: true,
		} ) : {} ),
	} )

	// Image.
	const {
		imageAlign = '',
		imageTabletAlign = '',
		contentTabletAlign = '',
		imageMobileAlign = '',
		contentMobileAlign = '',
	} = props.attributes
	if ( showImage ) {
		styles.push( {
			...createImageStyleSet( 'image%s', 'ugb-img', props.attributes ),
		} )

		styles.push( {
			'.ugb-img, .ugb-feature-grid__image': {
				marginLeft: imageAlign !== '' || contentAlign !== '' ? marginLeftAlign( imageAlign || contentAlign ) + ' !important' : undefined,
				marginRight: imageAlign !== '' || contentAlign !== '' ? marginRightAlign( imageAlign || contentAlign ) + ' !important' : undefined,
			},
			tablet: {
				'.ugb-img, .ugb-feature-grid__image': {
					marginLeft: imageTabletAlign !== '' || contentTabletAlign !== '' ? marginLeftAlign( imageTabletAlign || contentTabletAlign ) + ' !important' : undefined,
					marginRight: imageTabletAlign !== '' || contentTabletAlign !== '' ? marginRightAlign( imageTabletAlign || contentTabletAlign ) + ' !important' : undefined,
				},
			},
			mobile: {
				'.ugb-img, .ugb-feature-grid__image': {
					marginLeft: imageMobileAlign !== '' || contentMobileAlign !== '' ? marginLeftAlign( imageMobileAlign || contentMobileAlign ) + ' !important' : undefined,
					marginRight: imageMobileAlign !== '' || contentMobileAlign !== '' ? marginRightAlign( imageMobileAlign || contentMobileAlign ) + ' !important' : undefined,
				},
			},
		} )
	}

	// Title.
	const {
		titleColor = '',
		showTitle = true,
	} = props.attributes
	if ( showTitle ) {
		const titleColorSelector = applyFilters( 'stackable.feature-grid.styles.title.color-selector', '.ugb-feature-grid__title', props )
		styles.push( {
			[ titleColorSelector ]: {
				color: whiteIfDark( titleColor, show.columnBackground && columnBackgroundColor ),
			},
		} )

		styles.push( {
			'.ugb-feature-grid__title': {
				...createTypographyStyles( 'title%s', 'desktop', props.attributes ),
				textAlign: getValue( 'titleAlign' ) || getValue( 'contentAlign' ),
			},
			tablet: {
				'.ugb-feature-grid__title': {
					...createTypographyStyles( 'title%s', 'tablet', props.attributes ),
					textAlign: getValue( 'titleTabletAlign' ) || getValue( 'contentTabletAlign' ),
				},
			},
			mobile: {
				'.ugb-feature-grid__title': {
					...createTypographyStyles( 'title%s', 'mobile', props.attributes ),
					textAlign: getValue( 'titleMobileAlign' ) || getValue( 'contentMobileAlign' ),
				},
			},
		} )
	}

	// Description.
	const {
		descriptionColor = '',
		showDescription = true,
	} = props.attributes
	if ( showDescription ) {
		const colorSelector = applyFilters( 'stackable.feature-grid.styles.description.color-selector', '.ugb-feature-grid__description', props )
		styles.push( {
			[ colorSelector ]: {
				color: whiteIfDark( descriptionColor, show.columnBackground && columnBackgroundColor ),
			},
		} )
		styles.push( {
			'.ugb-feature-grid__description': {
				...createTypographyStyles( 'description%s', 'desktop', props.attributes ),
				textAlign: getValue( 'descriptionAlign' ) || getValue( 'contentAlign' ),
			},
			tablet: {
				'.ugb-feature-grid__description': {
					...createTypographyStyles( 'description%s', 'tablet', props.attributes ),
					textAlign: getValue( 'descriptionTabletAlign' ) || getValue( 'contentTabletAlign' ),
				},
			},
			mobile: {
				'.ugb-feature-grid__description': {
					...createTypographyStyles( 'description%s', 'mobile', props.attributes ),
					textAlign: getValue( 'descriptionMobileAlign' ) || getValue( 'contentMobileAlign' ),
				},
			},
		} )
	}

	// Button.
	const {
		showButton = true,
		buttonDesign = '',
	} = props.attributes
	if ( showButton ) {
		styles.push( {
			...createButtonStyleSet( `button%s`, `ugb-button`, {
				...props.attributes,
				buttonDesign: buttonDesign || 'plain',
			} ),
		} )
		styles.push( {
			'.ugb-button-container': {
				textAlign: getValue( 'buttonAlign', '%s !important' ) || getValue( 'contentAlign', '%s !important' ),
			},
			tablet: {
				'.ugb-button-container': {
					textAlign: getValue( 'buttonTabletAlign', '%s !important' ) || getValue( 'contentTabletAlign', '%s !important' ),
				},
			},
			mobile: {
				'.ugb-button-container': {
					textAlign: getValue( 'buttonMobileAlign', '%s !important' ) || getValue( 'contentMobileAlign', '%s !important' ),
				},
			},
		} )
	}

	// Spacing.
	if ( show.imageSpacing ) {
		styles.push( ...createResponsiveStyles( '.ugb-feature-grid__image', 'image%sBottomMargin', 'marginBottom', '%spx', props.attributes, true ) )
	}
	if ( show.titleSpacing ) {
		styles.push( ...createResponsiveStyles( '.ugb-feature-grid__title', 'title%sBottomMargin', 'marginBottom', '%spx', props.attributes, true ) )
	}
	if ( show.descriptionSpacing ) {
		styles.push( ...createResponsiveStyles( '.ugb-feature-grid__description', 'description%sBottomMargin', 'marginBottom', '%spx', props.attributes, true ) )
	}
	if ( show.buttonSpacing ) {
		styles.push( ...createResponsiveStyles( '.ugb-button-container', 'button%sBottomMargin', 'marginBottom', '%spx', props.attributes, true ) )
	}

	// Advanced image.
	if ( showImage ) {
		range( 1, columns + 1 ).forEach( i => {
			if ( props.attributes[ `image${ i }Shape` ] ) {
				styles.push( {
					[ `.ugb-feature-grid__item${ i } .ugb-img` ]: createImageMask( `image${ i }%s`, props.attributes ),
				} )
			}
		} )
	}

	return deepmerge.all( styles )
}

export default createStyles

/**
 * External dependencies
 */
import {
	createBackgroundStyleSet,
	createResponsiveStyles,
	createTypographyStyles,
	whiteIfDark,
} from '~stackable/util'

/**
 * Internal dependencies
 */
import { showOptions } from '.'
import deepmerge from 'deepmerge'

/**
 * WordPress dependencies
 */
import { sprintf } from '@wordpress/i18n'

export const createStyles = props => {
	const getValue = ( attrName, format = '' ) => {
		const value = typeof props.attributes[ attrName ] === 'undefined' ? '' : props.attributes[ attrName ]
		return value !== '' ? ( format ? sprintf( format, value ) : value ) : undefined
	}

	const show = showOptions( props )

	const styles = []
	styles.push( {
		'.ugb-countup__icon, .ugb-countup__counter, .ugb-countup__title, .ugb-countup__description': {
			textAlign: getValue( 'contentAlign' ),
		},
		tablet: {
			'.ugb-countup__icon, .ugb-countup__counter, .ugb-countup__title, .ugb-countup__description': {
				textAlign: getValue( 'tabletContentAlign' ),
			},
		},
		mobile: {
			'.ugb-countup__icon, .ugb-countup__counter, .ugb-countup__title, .ugb-countup__description': {
				textAlign: getValue( 'mobileContentAlign' ),
			},
		},
	} )

	if ( show.columnBackground ) {
		styles.push( {
			'.ugb-countup__item': {
				borderRadius: getValue( 'borderRadius', '%spx !important' ),
			},
		} )
	}

	// Column Background.
	styles.push( {
		...( show.columnBackground ? createBackgroundStyleSet( 'column%s', 'ugb-countup__item', props.attributes ) : {} ),
	} )

	// Spacing.
	const {
		showIcon = false,
		showNumber = true,
		showTitle = true,
		showDescription = true,
	} = props.attributes
	if ( showIcon ) {
		styles.push( ...createResponsiveStyles( '.ugb-countup__icon', 'icon%sBottomMargin', 'marginBottom', '%spx', props.attributes, true ) )
	}
	if ( showNumber ) {
		styles.push( ...createResponsiveStyles( '.ugb-countup__counter', 'number%sBottomMargin', 'marginBottom', '%spx', props.attributes, true ) )
	}
	if ( showTitle ) {
		styles.push( ...createResponsiveStyles( '.ugb-countup__title', 'title%sBottomMargin', 'marginBottom', '%spx', props.attributes, true ) )
	}
	if ( showDescription ) {
		styles.push( ...createResponsiveStyles( '.ugb-countup__description', 'description%sBottomMargin', 'marginBottom', '%spx', props.attributes, true ) )
	}

	// Icon
	const {
		iconColor = '',
		columnBackgroundColor = '',
		showBlockBackground = false,
		blockBackgroundBackgroundColor = '',
	} = props.attributes
	if ( showIcon ) {
		styles.push( {
			'.ugb-countup__icon': {
				textAlign: getValue( 'iconAlign' ),
			},
			'.ugb-countup__icon svg': {
				color: whiteIfDark( iconColor, show.columnBackground ? columnBackgroundColor : ( showBlockBackground ? blockBackgroundBackgroundColor : '' ) ),
				height: getValue( 'iconSize', '%spx' ),
				width: getValue( 'iconSize', '%spx' ),
			},
			tablet: {
				'.ugb-countup__icon svg': {
					height: getValue( 'iconTabletSize', '%spx' ),
					width: getValue( 'iconTabletSize', '%spx' ),
				},
			},
			mobile: {
				'.ugb-countup__icon svg': {
					height: getValue( 'iconMobileSize', '%spx' ),
					width: getValue( 'iconMobileSize', '%spx' ),
				},
			},
		} )
	}

	// Title.
	const {
		titleColor = '',
	} = props.attributes
	if ( showTitle ) {
		styles.push( {
			'.ugb-countup__title': {
				...createTypographyStyles( 'title%s', 'desktop', props.attributes ),
				color: whiteIfDark( titleColor, show.columnBackground ? columnBackgroundColor : ( showBlockBackground ? blockBackgroundBackgroundColor : '' ) ),
				textAlign: getValue( 'titleAlign' ),
			},
			tablet: {
				'.ugb-countup__title': {
					...createTypographyStyles( 'title%s', 'tablet', props.attributes ),
					textAlign: getValue( 'titleTabletAlign' ),
				},
			},
			mobile: {
				'.ugb-countup__title': {
					...createTypographyStyles( 'title%s', 'mobile', props.attributes ),
					textAlign: getValue( 'titleMobileAlign' ),
				},
			},
		} )
	}

	// Number.
	const {
		numberColor = '',
	} = props.attributes
	if ( showNumber ) {
		styles.push( {
			'.ugb-countup__counter': {
				...createTypographyStyles( 'number%s', 'desktop', props.attributes ),
				color: whiteIfDark( numberColor, show.columnBackground ? columnBackgroundColor : ( showBlockBackground ? blockBackgroundBackgroundColor : '' ) ),
				textAlign: getValue( 'numberAlign' ),
			},
			tablet: {
				'.ugb-countup__counter': {
					...createTypographyStyles( 'number%s', 'tablet', props.attributes ),
					textAlign: getValue( 'numberTabletAlign' ),
				},
			},
			mobile: {
				'.ugb-countup__counter': {
					...createTypographyStyles( 'number%s', 'mobile', props.attributes ),
					textAlign: getValue( 'numberMobileAlign' ),
				},
			},
		} )
	}

	// Description.
	const {
		descriptionColor = '',
	} = props.attributes
	if ( showDescription ) {
		styles.push( {
			'.ugb-countup__description': {
				...createTypographyStyles( 'description%s', 'desktop', props.attributes ),
				color: whiteIfDark( descriptionColor, show.columnBackground ? columnBackgroundColor : ( showBlockBackground ? blockBackgroundBackgroundColor : '' ) ),
				textAlign: getValue( 'descriptionAlign' ),
			},
			tablet: {
				'.ugb-countup__description': {
					...createTypographyStyles( 'description%s', 'tablet', props.attributes ),
					textAlign: getValue( 'descriptionTabletAlign' ),
				},
			},
			mobile: {
				'.ugb-countup__description': {
					...createTypographyStyles( 'description%s', 'mobile', props.attributes ),
					textAlign: getValue( 'descriptionMobileAlign' ),
				},
			},
		} )
	}

	// Advanced individual column color styles.
	const { columns = 2 } = props.attributes
	styles.push( [ 1, 2, 3, 4 ].reduce( ( colStyles, i ) => {
		if ( columns < i ) {
			return colStyles
		}
		return {
			...colStyles,
			[ `.ugb-countup__item${ i }` ]: {
				backgroundColor: show.columnBackground ? getValue( `column${ i }BackgroundColor` ) : undefined,
			},
			[ `.ugb-countup__item${ i }:before` ]: {
				background: show.columnBackground ? getValue( `column${ i }BackgroundColor` ) : undefined,
			},
			[ `.ugb-countup__item${ i } .ugb-countup__icon svg` ]: {
				color: showIcon ? getValue( `column${ i }IconColor` ) : undefined,
			},
			[ `.ugb-countup__item${ i } .ugb-countup__title` ]: {
				color: showTitle ? getValue( `column${ i }TitleColor` ) : undefined,
			},
			[ `.ugb-countup__item${ i } .ugb-countup__counter` ]: {
				color: showNumber ? getValue( `column${ i }NumberColor` ) : undefined,
			},
			[ `.ugb-countup__item${ i } .ugb-countup__description` ]: {
				color: showDescription ? getValue( `column${ i }DescriptionColor` ) : undefined,
			},
		}
	}, {} ) )

	return deepmerge.all( styles )
	// return {
	// 	'.ugb-icon-list li': {
	// 		...createTypographyStyles( 'listText%s', 'desktop', props.attributes ),
	// 		color: whiteIfDark( listTextColor, showBlockBackground && blockBackgroundBackgroundColor ),
	// 		'--icon': 'url(\'data:image/svg+xml;base64,' + iconSVGString + '\')',
	// 		'--icon-size': iconSize ? `${ iconSize }px` : undefined,
	// 		'--gap': gap ? `${ gap }px` : undefined,
	// 	},
	// }
}

export default createStyles

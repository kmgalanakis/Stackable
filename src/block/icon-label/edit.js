/**
 * Internal dependencies
 */
import { IconLabelStyles } from './style'

/**
 * External dependencies
 */
import { version as VERSION, i18n } from 'stackable'
import classnames from 'classnames'
import {
	InspectorTabs,
	InspectorStyleControls,
	PanelAdvancedSettings,
	AdvancedRangeControl,
	InspectorBottomTip,
} from '~stackable/components'
import {
	BlockDiv,
	useGeneratedCss,
	MarginBottom,
	getRowClasses,
	getAlignmentClasses,
	Advanced,
	CustomCSS,
	Responsive,
	CustomAttributes,
	EffectsAnimations,
	ConditionalDisplay,
	Transform,
} from '~stackable/block-components'
import {
	withBlockAttributeContext, withBlockWrapper, withQueryLoopContext,
} from '~stackable/higher-order'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'
import { InnerBlocks } from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { addFilter } from '@wordpress/hooks'

export const TEMPLATE = [
	[ 'stackable/icon', { contentAlign: 'left' } ],
	[ 'stackable/heading', {
		text: __( 'Icon Label', i18n ), hasP: true, textTag: 'h4',
	} ],
]

const Edit = props => {
	const {
		className, attributes, clientId,
	} = props

	useGeneratedCss( props.attributes )

	const rowClass = getRowClasses( attributes )
	const blockAlignmentClass = getAlignmentClasses( attributes )

	const blockClassNames = classnames( [
		className,
		'stk-block-icon-label',
		rowClass,
	] )

	const contentClassNames = classnames( [
		'stk-inner-blocks',
		blockAlignmentClass,
		'stk-block-content',
	] )

	return (
		<Fragment>
			<InspectorTabs />
			<BlockDiv.InspectorControls />
			<InspectorStyleControls>
				<PanelAdvancedSettings
					title={ __( 'General', i18n ) }
					id="general"
					initialOpen={ true }
				>
					<AdvancedRangeControl
						label={ __( 'Icon Gap', i18n ) }
						attribute="iconGap"
						responsive="all"
						min={ 0 }
						sliderMax={ 300 }
						placeholder="64"
					/>
				</PanelAdvancedSettings>

			</InspectorStyleControls>
			<Advanced.InspectorControls />
			<Transform.InspectorControls />
			<EffectsAnimations.InspectorControls />
			<CustomAttributes.InspectorControls />
			<CustomCSS.InspectorControls mainBlockClass="stk-block-icon-label" />
			<Responsive.InspectorControls />
			<ConditionalDisplay.InspectorControls />

			<InspectorStyleControls>
				<InspectorBottomTip />
			</InspectorStyleControls>

			<IconLabelStyles version={ VERSION } />
			<CustomCSS mainBlockClass="stk-block-icon-label" />

			<BlockDiv className={ blockClassNames }>
				<Fragment>
					<div className={ contentClassNames }>
						<InnerBlocks
							orientation="horizontal"
							template={ TEMPLATE }
							templateLock="insert"
							templateInsertUpdatesSelection={ true }
						/>
					</div>
				</Fragment>
			</BlockDiv>
			{ /* Hack, somehow the icon list doesn't have a uniqueId when it's just added, so the data-block-id isn't populated and isn't detected, this fixes that. */ }
			<MarginBottom previewSelector={ `[data-block="${ clientId }"] > .stk-block` } />
		</Fragment>
	)
}

export default compose(
	withBlockWrapper,
	withQueryLoopContext,
	withBlockAttributeContext,
)( Edit )

// Disable bottom margins for child blocks.
addFilter( 'stackable.edit.margin-bottom.enable-handlers', 'stackable/icon-label', ( enabled, parentBlock ) => {
	return parentBlock?.name === 'stackable/icon-label' ? false : enabled
} )

// Disable top and bottom line of heading block.
addFilter( 'stackable.heading.edit.top-bottom-line.enable-handlers', 'stackable/icon-label', ( enabled, parentBlock ) => {
	return parentBlock?.name === 'stackable/icon-label' ? false : enabled
} )

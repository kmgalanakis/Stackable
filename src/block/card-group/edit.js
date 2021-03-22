/**
 * Internal dependencies
 */
import createStyles from './style'

/**
 * External dependencies
 */
import { i18n, version as VERSION } from 'stackable'
import classnames from 'classnames'
import {
	InspectorTabs,
	PanelAdvancedSettings,
	InspectorSectionControls,
	ResizableBottomMargin,
} from '~stackable/components'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import {
	InnerBlocks,
} from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'
import { getMarginBottomProps, useMarginBottom } from '~stackable/helpers'
import { BlockDiv, Style } from '~stackable/block-components'

const Edit = props => {
	const {
		className,
		setAttributes,
	} = props
	const {
		hasBackground,
	} = props.attributes

	const marginBottomProps = getMarginBottomProps( props.attributes )
	const { setMarginBottom } = useMarginBottom()

	const blockClassNames = classnames( [
		className,
		'stk-card-group',
		'stk-row',
	] )

	const contentClassNames = classnames( [
		'stk-inner-blocks',
		'stk-block-content',
	] )

	return <Fragment>

		<InspectorTabs
			{ ...props }
		/>

		<InspectorSectionControls>
			<PanelAdvancedSettings
				title={ __( 'Background', i18n ) }
				id="background"
				checked={ hasBackground }
				onChange={ hasBackground => setAttributes( { hasBackground } ) }
				// toggleOnSetAttributes={ [
				// 	'arrowSize',
				// 	'arrowColor',
				// ] }
				toggleAttributeName="hasBackground"
			>
			</PanelAdvancedSettings>
		</InspectorSectionControls>

		<BlockDiv className={ blockClassNames }>
			<Style styleFunc={ createStyles( VERSION ) } />
			<div className={ contentClassNames }>
				<InnerBlocks
					orientation="horizontal"
					allowedBlocks={ [ 'stackable/card' ] }
				/>
			</div>
			<ResizableBottomMargin
				{ ...marginBottomProps }
				{ ...setMarginBottom }
			/>
		</BlockDiv>
	</Fragment>
}

export default Edit

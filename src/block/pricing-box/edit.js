/** Internal dependencies
 */
import BlockStyles from './style'
import variations from './variations'

/**
 * External dependencies
 */
import classnames from 'classnames'
import { version as VERSION } from 'stackable'
import { last } from 'lodash'
import {
	ColumnInnerBlocks, InspectorBottomTip, InspectorStyleControls, InspectorTabs,
} from '~stackable/components'
import {
	BlockDiv,
	useGeneratedCss,
	getAlignmentClasses,
	Alignment,
	Advanced,
	CustomCSS,
	Responsive,
	CustomAttributes,
	EffectsAnimations,
	ConditionalDisplay,
	MarginBottom,
	Transform,
	ContainerDiv,
	BlockLink,
	ContentAlign,
	getContentAlignmentClasses,
} from '~stackable/block-components'
import { useBlockContext } from '~stackable/hooks'
import {
	withBlockAttributeContext, withBlockWrapper, withQueryLoopContext,
} from '~stackable/higher-order'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'
import { __ } from '@wordpress/i18n'
import { InnerBlocks } from '@wordpress/block-editor'

const TEMPLATE = variations[ 0 ].innerBlocks

const Edit = props => {
	const {
		className,
	} = props

	useGeneratedCss( props.attributes )

	const { hasInnerBlocks, innerBlocks } = useBlockContext()
	const blockAlignmentClass = getAlignmentClasses( props.attributes )

	const blockClassNames = classnames( [
		className,
		'stk-block-pricing-box',
	] )

	const contentClassNames = classnames( [
		'stk-block-content',
		'stk-inner-blocks',
		blockAlignmentClass,
		`stk-${ props.attributes.uniqueId }-container`,
		'stk-block-pricing-box__content',
	], getContentAlignmentClasses( props.attributes ) )

	const lastBlockName = last( innerBlocks )?.name
	const renderAppender = hasInnerBlocks ? ( [ 'stackable/text', 'core/paragraph' ].includes( lastBlockName ) ? () => <></> : InnerBlocks.DefaultBlockAppender ) : InnerBlocks.ButtonBlockAppender

	return (
		<>

			<InspectorTabs />

			<Alignment.InspectorControls hasBlockAlignment={ true } />
			<BlockDiv.InspectorControls />
			<Advanced.InspectorControls />
			<Transform.InspectorControls />
			<BlockLink.InspectorControls />
			<EffectsAnimations.InspectorControls />
			<CustomAttributes.InspectorControls />
			<CustomCSS.InspectorControls mainBlockClass="stk-block-pricing-box" />
			<Responsive.InspectorControls />
			<ConditionalDisplay.InspectorControls />
			<ContentAlign.InspectorControls />
			<ContainerDiv.InspectorControls sizeSelector=".stk-block-content" />

			<InspectorStyleControls>
				<InspectorBottomTip />
			</InspectorStyleControls>

			<BlockStyles version={ VERSION } />
			<CustomCSS mainBlockClass="stk-block-pricing-box" />

			<BlockDiv className={ blockClassNames } enableVariationPicker={ true }>
				<ContainerDiv className={ contentClassNames }>
					<ColumnInnerBlocks
						template={ TEMPLATE }
						templateLock={ false }
						renderAppender={ renderAppender }
					/>
				</ContainerDiv>
			</BlockDiv>
			{ hasInnerBlocks && <MarginBottom /> }
		</>
	)
}

export default compose(
	withBlockWrapper,
	withQueryLoopContext,
	withBlockAttributeContext,
)( Edit )

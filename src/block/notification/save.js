/**
 * Internal dependencies
 */
import { ContainerStyles } from './style'
import SVGCloseIcon from './images/close-icon.svg'

/**
 * External dependencies
 */
import { version as VERSION } from 'stackable'
import { withVersion } from '~stackable/higher-order'
import classnames from 'classnames'
import {
	BlockDiv,
	ContainerDiv,
	BlockLink,
	getAlignmentClasses,
	CustomCSS,
	getResponsiveClasses,
	getContentAlignmentClasses,
} from '~stackable/block-components'

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor'
import { compose } from '@wordpress/compose'

export const Save = props => {
	const {
		attributes,
		className,
	} = props

	const blockAlignmentClass = getAlignmentClasses( attributes )
	const responsiveClass = getResponsiveClasses( attributes )

	const blockClassNames = classnames( [
		className,
		'stk-block-notification',
		responsiveClass,
	], {
		'stk--is-dismissible': attributes.isDismissible,
		[ `stk--is-${ props.attributes.notificationType }` ]: props.attributes.notificationType,
	} )

	const contentClassNames = classnames( [
		'stk-block-notification__content',
	], getContentAlignmentClasses( attributes ) )

	const innerClassNames = classnames( [
		'stk-block-content',
		'stk-inner-blocks',
		blockAlignmentClass,
	] )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
		>
			<ContainerStyles.Content version={ props.version } attributes={ attributes } />
			<CustomCSS.Content attributes={ attributes } />
			<ContainerDiv.Content
				className={ contentClassNames }
				attributes={ attributes }
			>
				<div className={ innerClassNames }>
					<InnerBlocks.Content />
				</div>
				<BlockLink.Content attributes={ attributes } />
				{ attributes.isDismissible &&
					<button
						className="stk-block-notification__close-button"
					>
						<SVGCloseIcon
							width={ attributes.dismissibleSize || 16 }
							height={ attributes.dismissibleSize || 16 }
						/>
					</button>
				}
			</ContainerDiv.Content>
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )

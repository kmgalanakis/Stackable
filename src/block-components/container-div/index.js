import { addAttributes } from './attributes'
import { Style } from './style'
import { Edit } from './edit'

import classnames from 'classnames'
import { Div } from '~stackable/components'
import { getUniqueBlockClass, useQueryLoopInstanceId } from '~stackable/util'
import { useBlockAttributesContext } from '~stackable/hooks'
import { applyFilters } from '@wordpress/hooks'

export const ContainerDiv = props => {
	const attributes = useBlockAttributesContext()
	const instanceId = useQueryLoopInstanceId( attributes.uniqueId )
	let uniqueBlockClass = getUniqueBlockClass( attributes.uniqueId )
	uniqueBlockClass = instanceId ? uniqueBlockClass + `-${ instanceId }` : uniqueBlockClass

	uniqueBlockClass = applyFilters( 'stackable.block.uniqueClass', uniqueBlockClass, attributes, true )

	const classNames = classnames( [
		props.className,
		'stk-container',
		`${ uniqueBlockClass }-container`,
	], {
		'stk-hover-parent': attributes.hasContainer && attributes.triggerHoverState, // This is needed to trigger parent-hovered hover styles.
		'stk--no-background': ! attributes.hasContainer,
		'stk--no-padding': ! attributes.hasContainer,
	} )

	return <Div
		{ ...props }
		className={ classNames }
		hasBackground={ attributes.hasContainer }
		backgroundUrl={ attributes.containerBackgroundMediaUrl }
		backgroundUrlTablet={ attributes.containerBackgroundMediaUrlTablet }
		backgroundUrlMobile={ attributes.containerBackgroundMediaUrlMobile }
		backgroundColorType={ attributes.containerBackgroundColorType }
	/>
}

ContainerDiv.defaultProps = {
	className: '',
}

ContainerDiv.Content = props => {
	const {
		attributes,
		...propsToPass
	} = props

	const classNames = classnames( [
		props.className,
		'stk-container',
		applyFilters( 'stackable.block.uniqueClass', `stk-${ attributes.uniqueId }-container`, attributes, false ),
	], {
		'stk-hover-parent': attributes.hasContainer && attributes.triggerHoverState, // This is needed to trigger parent-hovered hover styles.
		'stk--no-background': ! attributes.hasContainer,
		'stk--no-padding': ! attributes.hasContainer,
	} )

	return <Div.Content
		{ ...propsToPass }
		className={ classNames }
		hasBackground={ attributes.hasContainer }
		backgroundUrl={ attributes.containerBackgroundMediaUrl }
		backgroundUrlTablet={ attributes.containerBackgroundMediaUrlTablet }
		backgroundUrlMobile={ attributes.containerBackgroundMediaUrlMobile }
		backgroundColorType={ attributes.containerBackgroundColorType }
	/>
}

ContainerDiv.Content.defaultProps = {
	className: '',
	attributes: {},
}

ContainerDiv.InspectorControls = Edit

ContainerDiv.addAttributes = addAttributes

ContainerDiv.Style = Style

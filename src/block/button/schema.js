import {
	Advanced,
	BlockDiv,
	CustomCSS,
	Responsive,
	Button,
	Typography,
	Icon,
} from '~stackable/block-components'
import { AttributeObject } from '~stackable/util'
import { version as VERSION } from 'stackable'

export const attributes = ( version = VERSION ) => {
	const attrObject = new AttributeObject()
	BlockDiv.addAttributes( attrObject )
	CustomCSS.addAttributes( attrObject )
	Responsive.addAttributes( attrObject )
	Advanced.addAttributes( attrObject )
	Button.addAttributes( attrObject, { selector: '.stk-button__button' } )

	Typography.addAttributes( attrObject, '.stk-button__inner-text', {
		hasTextTag: false,
	} )

	Icon.addAttributes( attrObject, {
		enableGradient: false,
		enableShape: false,
		enableBackgroundShape: false,
	} )

	return attrObject.getMerged( version )
}

export default attributes( VERSION )

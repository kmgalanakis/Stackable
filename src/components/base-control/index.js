/**
 * Internal dependencies
 */
import BaseControlMultiLabel from '../base-control-multi-label'
import Button from '../button'

/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import {
	BaseControl as _BaseControl, Dashicon,
} from '@wordpress/components'
import { i18n } from 'stackable'
import { __ } from '@wordpress/i18n'

const BaseControl = props => {
	const className = classnames( [
		'stk-inspector-control',
		props.className,
	], {
		'stk-insector-control--allow-reset': props.allowReset,
		'stk--is-small': props.isSmall,
	} )

	const showReset = props.showReset !== null
		? props.showReset
		: ( typeof props.value !== 'undefined' && props.value !== props.defaultValue && props.value !== props.placeholder )

	return (
		<_BaseControl
			help={ props.help }
			className={ className }
		>
			{ props.hasLabel &&
				<BaseControlMultiLabel
					label={ props.label }
					units={ props.units }
					unit={ props.unit }
					onChangeUnit={ props.onChangeUnit }
					screens={ props.screens }
					afterButton={ props.afterButton }
				/>
			}
			{ props.children }
			{ props.allowLink &&
				<Button
					className={ classnames(
						[ 'stk-inspector-control__link-button' ],
						{ 'stk--is-linked': props.isLinked }
					) }
					isSmall
					isSecondary={ props.isLinked ? true : false }
					aria-label={ props.isLinked ? __( 'Unlink attribute', i18n ) : __( 'Link attribute', i18n ) }
					onClick={ props.onLink }
					icon={ (
						<Dashicon
							icon={ props.isLinked ? 'admin-links' : 'editor-unlink' }
						/>
					) }
				/>
			}
			{ props.allowReset && showReset &&
				<Button
					className="stk-inspector-control__reset-button"
					isSmall
					aria-label={ __( 'Reset', i18n ) }
					onClick={ () => {
						if ( props.onReset ) {
							props.onReset()
						} else {
							props.onChange( props.defaultValue )
						}
					} }
					icon={ (
						<Dashicon
							icon="image-rotate"
						/>
					) }
				/>
			}
		</_BaseControl>
	)
}

BaseControl.defaultProps = {
	className: '',
	help: '',
	id: '',
	screens: [ 'desktop' ],
	units: null,
	unit: 'px',
	onChangeUnit: () => {},
	value: '',
	onChange: () => {},
	allowReset: false,
	showReset: null,
	defaultValue: '',
	onReset: null,
	allowLink: false,
	isLinked: true,
	onLink: () => {},
	afterButton: null,
	isSmall: false,
	hasLabel: true,
}

export default BaseControl

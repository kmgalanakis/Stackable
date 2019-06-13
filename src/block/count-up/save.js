import { BlockContainer, SvgIcon } from '@stackable/components'
import { hasBackgroundOverlay, range } from '@stackable/util'
import { withBlockStyles, withUniqueClass } from '@stackable/higher-order'
import { applyFilters } from '@wordpress/hooks'
import classnames from 'classnames'
import { compose } from '@wordpress/compose'
import createStyles from './style'
import { Fragment } from '@wordpress/element'
import { RichText } from '@wordpress/editor'

const save = props => {
	const { className, attributes } = props
	const {
		columns,
		design = 'plain',
		titleTag = '',
		showIcon = false,
		showNumber = true,
		showTitle = true,
		showDescription = true,
	} = attributes

	const mainClasses = classnames( [
		className,
		'ugb-countup--v4', // For backward compatibility.
		`ugb-countup--columns-${ columns }`,
	], applyFilters( 'stackable.count-up.mainclasses', {
		[ `ugb-countup--design-${ design }` ]: design !== 'plain',
	}, design, props ) )

	return (
		<BlockContainer.Save className={ mainClasses } aria-hidden="true" blockProps={ props } render={ () => (
			<Fragment>
				{ range( 1, columns + 1 ).map( i => {
					const icon = attributes[ `icon${ i }` ]
					const title = attributes[ `title${ i }` ]
					const description = attributes[ `description${ i }` ]
					const countText = attributes[ `countText${ i }` ]

					const iconComp = showIcon && <div className="ugb-countup__icon">
						<SvgIcon.Content value={ icon } />
					</div>
					const titleComp = showTitle && ! RichText.isEmpty( title ) && (
						<RichText.Content
							tagName={ titleTag || 'h4' }
							className="ugb-countup__title"
							value={ title }
						/>
					)
					const countComp = showNumber && ! RichText.isEmpty( countText ) && (
						<RichText.Content
							tagName="div"
							className="ugb-countup__counter"
							value={ countText }
							data-duration="1000"
							data-delay="16"
						/>
					)
					const descriptionComp = showDescription && ! RichText.isEmpty( description ) && (
						<RichText.Content
							tagName="p"
							className="ugb-countup__description"
							value={ description }
						/>
					)
					const comps = {
						i,
						iconComp,
						titleComp,
						countComp,
						descriptionComp,
					}

					const boxClasses = classnames( [
						'ugb-countup__item',
						`ugb-countup__item${ i }`,
					], applyFilters( 'stackable.count-up.boxclasses', {
						'ugb--has-background-overlay': hasBackgroundOverlay( 'column%s', props.attributes ),
					}, design, props ) )

					if ( design === 'plain-2' ) {
						return applyFilters( 'stackable.count-up.save.output', (
							<div className={ boxClasses } key={ i }>
								{ iconComp }
								{ countComp }
								{ titleComp }
								{ descriptionComp }
							</div>
						), comps, i, props )
					}
					return applyFilters( 'stackable.count-up.save.output', (
						<div className={ boxClasses } key={ i }>
							{ iconComp }
							{ titleComp }
							{ countComp }
							{ descriptionComp }
						</div>
					), comps, i, props )
				} ) }
			</Fragment>
		) } />
	)
}

export default compose(
	withUniqueClass,
	withBlockStyles( createStyles ),
)( save )

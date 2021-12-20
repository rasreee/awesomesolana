import classNames from 'classnames'
import Link from 'next/link'
import React, { FC } from 'react'

import { SourceType } from '@/models/source'

import { SourcesFeedGrid } from './SourcesFeedGrid'

export type SourcesSectionHeaderProps = {
	sourceType: SourceType
}

const SourcesSectionHeader: FC<SourcesSectionHeaderProps> = ({ sourceType }) => {
	const caption = `${sourceType.replace('-', ' ')}s`
	const sourcesPathname = `/sources?type=${sourceType}`

	return (
		<div
			className={classNames(
				'flex',
				'items-center justify-between',
				/* Hacky way to make left side of header match content's starting point */
				'py-2',
				'md:px-5 lg:px-3'
			)}
		>
			<h6 className="text-gray-800 text-sm uppercase font-bold">{caption}</h6>
			<Link href={sourcesPathname}>
				<a
					className={classNames(
						'hover:underline',
						'uppercase text-primary-500 font-semibold text-sm',
						'px-3',
						'py-1 md:py-2',
						'cursor-pointer',
						'rounded-md'
					)}
				>
					{'view all'}
				</a>
			</Link>
		</div>
	)
}

export type SourcesSectionFeedProps = {
	sourceType: SourceType
}

export type SourcesSectionProps = {
	sourceType: SourceType
}

export const SourcesSection: FC<SourcesSectionProps> = ({ sourceType }) => {
	return (
		<div className={classNames('grid', 'space-y-2')}>
			{/* Section header */}
			<SourcesSectionHeader sourceType={sourceType} />
			{/* Section content below header */}
			<SourcesFeedGrid sourceType={sourceType} opts={{ limit: 3 }} spaceYClasses={'space-y-2 md:space-y-0'} />
		</div>
	)
}

import classNames from 'classnames'
import React from 'react'

import { Page } from '@/common/components'
import { useIsMobileDevice } from '@/common/hooks'

import { useSourcesFeed } from './SourcesFeedContext'
import { SourcesFeedGrid } from './SourcesFeedGrid'
import { SourcesFeedSidebar } from './SourcesFeedSidebar'

export interface SourcesFeedPageProps {}

export const SourcesFeedPage: React.FunctionComponent<SourcesFeedPageProps> = () => {
	const isMobileDevice = useIsMobileDevice()
	const { sourceTypes } = useSourcesFeed()

	const caption = sourceTypes ? `All ${sourceTypes}` : 'All sources'

	return (
		<Page title={caption} description={caption}>
			<div className="flex justify-start w-full">
				<SourcesFeedSidebar />
				<div className={classNames(!isMobileDevice && 'flex flex-col gap-2')}>
					{!isMobileDevice && (
						<div className={classNames('flex', 'items-center justify-between', 'py-2', 'px-5 md:px-2')}>
							<h1 className="text-gray-800 text-lg uppercase font-bold">{caption}</h1>
						</div>
					)}
					<div className="mobile:py-2">
						{sourceTypes.map((type) => (
							<SourcesFeedGrid
								key={type}
								sourceType={type}
								spaceXClasses={'space-x-0 md:space-x-0'}
								spaceYClasses={'space-y-2 md:space-y-0'}
							/>
						))}
					</div>
				</div>
			</div>
		</Page>
	)
}

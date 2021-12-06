import { SupabaseClient } from '@supabase/supabase-js'
import useSWR, { Fetcher } from 'swr'

import { useSupabase } from '@/common/supabase/useSupabase'
import { handleSupabaseResponse } from '@/common/utils/handleSupabaseResponse'
import { SWRResponseWithLoading } from '@/common/utils/swr'
import { FetcherOptions } from '@/common/utils/types'

import { parseRawSourcesData } from './parseRawSourceData'
import { RawSourceData, Source } from './source.types'

const makeFetcher = (supabase: SupabaseClient, opts?: FetcherOptions) => {
	const fetcher: Fetcher<Source[]> = async () => {
		let request = supabase.from<RawSourceData>('sources').select('*')

		if (opts?.limit) {
			request = request.limit(opts.limit)
		}

		const data = await request.then(handleSupabaseResponse).then(parseRawSourcesData)

		return data
	}

	return fetcher
}

export const useAllSources = (opts?: FetcherOptions): SWRResponseWithLoading<Source[], Error> => {
	const client = useSupabase()
	const keyOpts = opts ? `&limit=${opts.limit}` : ''
	const key = `sources/all?${keyOpts}`

	const swr = useSWR<Source[], Error>(key, makeFetcher(client, opts))

	/* Check if data is still being fetched */
	const isLoading = typeof swr.data === 'undefined' && typeof swr.error === 'undefined'

	return { ...swr, isLoading }
}
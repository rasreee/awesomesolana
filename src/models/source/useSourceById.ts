import { SupabaseClient } from '@supabase/supabase-js'
import useSWR, { Fetcher } from 'swr'

import { useSupabase } from '@/common/supabase/useSupabase'
import { SWRResponseWithLoading } from '@/common/utils'
import { handleSupabaseSingleResponse } from '@/common/utils/handleSupabaseResponse'

import { parseSingleRawSourceData } from './parseRawSourceData'
import { RawSourceData, Source } from './source.types'

const makeFetcher = (supabase: SupabaseClient, id: string) => {
	const fetcher: Fetcher<Source> = async () => {
		const request = supabase.from<RawSourceData>('sources').select('*').match({ id }).single()

		const data = await request.then(handleSupabaseSingleResponse).then(parseSingleRawSourceData)

		return data
	}

	return fetcher
}

export const useSourceById = (id: string): SWRResponseWithLoading<Source, Error> => {
	const supabase = useSupabase()
	const swr = useSWR(`/sources/${id}`, makeFetcher(supabase, id))

	/* Check if data is still being fetched */
	const isLoading = typeof swr.data === 'undefined' && typeof swr.error === 'undefined'

	return { ...swr, isLoading }
}
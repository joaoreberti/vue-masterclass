import type { CustomError, ExtendedPostgrestError } from '@/types/Error'
import { PostgrestError } from '@supabase/supabase-js'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<CustomError | ExtendedPostgrestError | null>(null)

  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError | Error
    customCode?: number
  }) => {
    if (
      typeof error === 'string' ||
      (error instanceof Error && !(error instanceof PostgrestError))
    ) {
      activeError.value = typeof error === 'string' ? Error(error) : error
      activeError.value.customCode = customCode
      return
    }

    const extendedPostgrestError: ExtendedPostgrestError = {
      ...error,
      statusCode: customCode,
    }
    activeError.value = extendedPostgrestError
  }
  return {
    activeError,
    setError,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot))
}

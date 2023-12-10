export const useAuth = () => {
  const supabase = useSupabaseClient()
  const loading = ref(false)
  const email = ref('')

  return {
    email,
    loading: computed(() => loading.value),
    async login() {
      if (!email.value) {
        alert('Email is required')
        return
      }
      try {
        loading.value = true
        const { error } = await supabase.auth.signInWithOtp({
          email: email.value,
          options: {
            emailRedirectTo: `${window.location.origin}/confirm`
          }
        })
        if (error) {
          throw error
        }
        alert('Check your email for the login link!')
      } catch (error) {
        alert(error)
      } finally {
        loading.value = false
      }
    },
    async logout() {
      await supabase.auth.signOut()
    }
  }
}

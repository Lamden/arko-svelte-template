import { writable, derived } from "svelte/store";

export const lwc = writable(null)
export const walletInfo = writable({})

export const wallet_account = derived(lwc, ($lwc) => {
    if ($lwc == null) return ''
    return $lwc.walletAddress
})

export const wallet_connected = derived(lwc, ($lwc) => {
    if ($lwc == null) return false
    return $lwc.approved
})

export const wallet_installed = derived(walletInfo, ($walletInfo) => {
    return $walletInfo.installed && $walletInfo.setup
})

export const wallet_locked = derived(walletInfo, ($walletInfo) => {
    return $walletInfo.locked
})

export const valid_account = writable(null)
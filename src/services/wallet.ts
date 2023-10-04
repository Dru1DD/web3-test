import { Core } from '@walletconnect/core'

export const core = new Core({
    projectId: process.env.REACT_APP_WALLET_PROJECT_ID
})

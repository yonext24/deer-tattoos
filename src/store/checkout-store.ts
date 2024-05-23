import { create } from 'zustand'

export type StageType = 'info' | 'shipment' | 'payment' | 'confirmation'
export const stages: StageType[] = ['info', 'shipment', 'payment', 'confirmation']

type CheckoutStore = {
  stage: StageType
  latestStage: StageType
  setStage: (stage: StageType) => void
  setLatestStage: (stage: StageType) => void
  setCurrentMercadoPagoPreferenceId: (id: string) => void
  currentMercadoPagoPreferenceId: string | null
}

export const useCheckoutStore = create<CheckoutStore>((set, get) => ({
  stage: 'info',
  latestStage: 'info',
  setStage: (stage) => {
    const stageIndex = stages.indexOf(stage)
    const latestStageIndex = stages.indexOf(get().latestStage)

    if (stageIndex > latestStageIndex) set({ latestStage: stage })
    set({ stage })
  },
  setLatestStage: (stage) => set({ latestStage: stage }),
  setCurrentMercadoPagoPreferenceId: (id) => {
    set({ currentMercadoPagoPreferenceId: id })
  },
  currentMercadoPagoPreferenceId: null
}))
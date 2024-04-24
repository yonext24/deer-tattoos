'use client'

import { useCheckoutStore, stages } from '@/store/checkout-store'

export function StageSection() {
  const { stage, latestStage, setStage } = useCheckoutStore()

  return (
    <section className="flex items-center justify-center mt-3 w-[70%] md:w-[50%]">
      {stages.map((s, i) => {
        const currentStageIndex = stages.indexOf(stage)
        const latestStageIndex = stages.indexOf(latestStage)
        if (currentStageIndex === -1) return null
        const isSelected = currentStageIndex >= i

        return (
          <StageItem
            key={s}
            isSelected={isSelected}
            i={i + 1}
            onClick={() => {
              if (i > latestStageIndex) return
              setStage(s)
            }}
          />
        )
      })}
    </section>
  )
}

function StageItem({
  isSelected,
  onClick,
  i,
}: {
  isSelected: boolean
  onClick: () => void
  i: number
}) {
  return (
    <>
      <button
        onClick={() => onClick()}
        data-selected={isSelected}
        className="w-8 h-8 rounded-full flex items-center justify-center border border-white data-[selected=true]:bg-white data-[selected=true]:text-black"
      >
        {i}
      </button>
      {i !== stages.length && <Line isSelected={isSelected} />}
    </>
  )
}

function Line({ isSelected }: { isSelected: boolean }) {
  return (
    <div
      data-selected={isSelected}
      style={{
        minWidth: `calc(${100 / (stages.length || 1)}% - ${
          stages.length * 32
        }px)`,
      }}
      className={`flex-1 border bg-white h-[3px] data-[selected=false]:bg-white/70`}
    />
  )
}

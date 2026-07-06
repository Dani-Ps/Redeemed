import { EmotionPicker } from '../components/EmotionPicker'
import { StepShell } from './StepShell'

interface Props {
  value: string | null
  onChange: (id: string) => void
}

export function StepEmotion({ value, onChange }: Props) {
  return (
    <StepShell
      paso={1}
      total={7}
      titulo="¿Qué emoción está más presente?"
      intro="No hay respuestas correctas. Elige la que mejor describe cómo te sientes ahora."
    >
      <EmotionPicker value={value} onChange={onChange} />
    </StepShell>
  )
}

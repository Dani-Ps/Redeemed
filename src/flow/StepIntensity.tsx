import { IntensitySlider } from '../components/IntensitySlider'
import { StepShell } from './StepShell'

interface Props {
  value: number
  onChange: (value: number) => void
}

export function StepIntensity({ value, onChange }: Props) {
  return (
    <StepShell
      paso={2}
      total={7}
      titulo="¿Con qué intensidad la sientes?"
      intro="Mueve el control. Ponerle un número ayuda a observar la emoción sin quedar atrapado en ella."
    >
      <IntensitySlider value={value} onChange={onChange} />
    </StepShell>
  )
}

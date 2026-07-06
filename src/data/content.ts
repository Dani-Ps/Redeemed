import type { Emotion, EmotionContent, Versiculo } from '../types'
import { DISTORSIONES, getDistorsion } from './distortions'

// ------------------------------------------------------------------
// Emotions (color + icon). Colors map to CSS token families.
// ------------------------------------------------------------------
export const EMOCIONES: Emotion[] = [
  { id: 'alegria', nombre: 'Alegría', icono: '😊', color: 'amber' },
  { id: 'tristeza', nombre: 'Tristeza', icono: '😔', color: 'peri' },
  { id: 'miedo', nombre: 'Miedo / Ansiedad', icono: '😰', color: 'peri' },
  { id: 'enojo', nombre: 'Enojo', icono: '😠', color: 'rose' },
  { id: 'culpa', nombre: 'Culpa', icono: '😞', color: 'ink' },
  { id: 'verguenza', nombre: 'Vergüenza', icono: '🙈', color: 'rose' },
  { id: 'soledad', nombre: 'Soledad', icono: '🌙', color: 'peri' },
  { id: 'gratitud', nombre: 'Gratitud', icono: '🙏', color: 'sage' },
  { id: 'esperanza', nombre: 'Esperanza', icono: '🌅', color: 'amber' },
  { id: 'cansancio', nombre: 'Cansancio / Agobio', icono: '🥱', color: 'sage' },
]

// ------------------------------------------------------------------
// Bible verses (well-known, Spanish). cita + texto.
// ------------------------------------------------------------------
export const VERSICULOS: Record<string, Versiculo> = {
  alegria: {
    id: 'filipenses-4-4',
    cita: 'Filipenses 4:4',
    texto: 'Regocijaos en el Señor siempre. Otra vez digo: ¡Regocijaos!',
  },
  tristeza: {
    id: 'salmo-34-18',
    cita: 'Salmo 34:18',
    texto:
      'Cercano está el Señor a los quebrantados de corazón, y salva a los contritos de espíritu.',
  },
  miedo: {
    id: 'isaias-41-10',
    cita: 'Isaías 41:10',
    texto:
      'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.',
  },
  enojo: {
    id: 'santiago-1-19',
    cita: 'Santiago 1:19',
    texto:
      'Todo hombre sea pronto para oír, tardo para hablar, tardo para airarse.',
  },
  culpa: {
    id: '1-juan-1-9',
    cita: '1 Juan 1:9',
    texto:
      'Si confesamos nuestros pecados, él es fiel y justo para perdonarnos y limpiarnos de toda maldad.',
  },
  verguenza: {
    id: 'salmo-34-5',
    cita: 'Salmo 34:5',
    texto: 'Los que miraron a él fueron alumbrados, y sus rostros no fueron avergonzados.',
  },
  soledad: {
    id: 'deuteronomio-31-6',
    cita: 'Deuteronomio 31:6',
    texto:
      'Esfuérzate y sé valiente; él no te dejará ni te desamparará.',
  },
  gratitud: {
    id: '1-tesalonicenses-5-18',
    cita: '1 Tesalonicenses 5:18',
    texto: 'Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros.',
  },
  esperanza: {
    id: 'jeremias-29-11',
    cita: 'Jeremías 29:11',
    texto:
      'Yo sé los pensamientos que tengo acerca de vosotros, pensamientos de paz y de esperanza.',
  },
  cansancio: {
    id: 'mateo-11-28',
    cita: 'Mateo 11:28',
    texto: 'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.',
  },
}

// ------------------------------------------------------------------
// Per-emotion curated content: validation, distortion, reframe,
// verse and practical actions. Warm, containing, non-clinical.
// ------------------------------------------------------------------
interface RawContent {
  validacion: string
  distorsionId: string
  reencuadre: string
  acciones: string[]
}

const CONTENIDO: Record<string, RawContent> = {
  alegria: {
    validacion:
      'Qué bueno reconocer la alegría y dejarla estar. Sentirte bien no es algo que debas justificar: es un regalo que también merece un lugar.',
    distorsionId: 'filtro-mental',
    reencuadre:
      'A veces la mente descarta lo bueno como "casualidad". Nombra en concreto qué hizo posible esta alegría hoy: ¿quién, qué momento, qué gesto?',
    acciones: [
      'Escribe una línea sobre este momento para volver a él en un día difícil.',
      'Comparte tu alegría con alguien: agradécele o cuéntale por qué hoy fue bueno.',
    ],
  },
  tristeza: {
    validacion:
      'La tristeza no es debilidad ni falta de fe: es una señal de que algo te importa. Puedes sentirla sin apurarte a taparla.',
    distorsionId: 'sobregeneralizacion',
    reencuadre:
      'La tristeza suele hablar en "siempre" y "nunca". Prueba a cambiar "todo está mal" por "hoy, en esto concreto, me siento así". ¿Qué parte sí sigue en pie?',
    acciones: [
      'Permítete diez minutos de descanso amable, sin exigirte estar bien.',
      'Escríbele a alguien de confianza, aunque sea un mensaje corto.',
    ],
  },
  miedo: {
    validacion:
      'El miedo aparece para protegerte, aunque a veces se adelanta demasiado. Reconocerlo ya es un acto de valentía.',
    distorsionId: 'catastrofizacion',
    reencuadre:
      'La ansiedad ensaya el peor final como si fuera seguro. Pregúntate: ¿qué es lo más probable, no lo más temido? ¿Qué evidencia tengo hoy, aquí?',
    acciones: [
      'Respira lento: inhala 4 tiempos, sostén 4, exhala 6. Repite cinco veces.',
      'Escribe la preocupación y, al lado, un primer paso pequeño y realista.',
    ],
  },
  enojo: {
    validacion:
      'El enojo suele señalar algo valioso que sientes herido o injusto. No eres "malo" por sentirlo; puedes escucharlo sin dejar que decida por ti.',
    distorsionId: 'lectura-mente',
    reencuadre:
      'El enojo a veces asume intenciones ajenas ("lo hizo para molestarme"). ¿Qué otra explicación, más amable, también podría ser cierta?',
    acciones: [
      'Antes de responder, espera: cuenta hasta diez o sal a caminar un momento.',
      'Nombra la necesidad detrás del enojo: ¿respeto, descanso, justicia, ser escuchado?',
    ],
  },
  culpa: {
    validacion:
      'La culpa sana puede guiarte a reparar; la culpa que aplasta solo repite el reproche. Puedes distinguir entre lo que hiciste y quién eres.',
    distorsionId: 'deberia',
    reencuadre:
      'Revisa los "debería" que te exiges. Cambia "no debí fallar nunca" por "hice lo que pude con lo que sabía, y puedo reparar esto".',
    acciones: [
      'Si puedes reparar algo, define un paso concreto y hazlo hoy.',
      'Escríbete una frase de perdón, la misma que le dirías a un buen amigo.',
    ],
  },
  verguenza: {
    validacion:
      'La vergüenza te dice "algo está mal en ti"; casi siempre exagera. Tu valor no depende de tu peor momento ni de la mirada de los demás.',
    distorsionId: 'etiquetado',
    reencuadre:
      'La vergüenza pone etiquetas globales ("soy un desastre"). Sepáralas del hecho: "cometí un error" no es lo mismo que "soy un error".',
    acciones: [
      'Cuéntale a alguien seguro eso que callas; la vergüenza pierde fuerza al nombrarla.',
      'Escribe tres cualidades tuyas que la vergüenza intenta hacerte olvidar.',
    ],
  },
  soledad: {
    validacion:
      'Sentirte solo duele, y también dice cuánto necesitas vínculo: eso es profundamente humano. No estás fallando por sentirlo.',
    distorsionId: 'lectura-mente',
    reencuadre:
      'La soledad susurra "a nadie le importo". ¿Es un hecho o un miedo? Nombra a una persona a la que sí podrías escribir hoy.',
    acciones: [
      'Envía un mensaje sencillo a alguien: no hace falta una razón perfecta.',
      'Busca un espacio con otras personas, aunque sea en silencio compartido.',
    ],
  },
  gratitud: {
    validacion:
      'La gratitud abre el corazón y ordena la mirada. Detenerte a reconocerla ya cambia el tono de tu día.',
    distorsionId: 'filtro-mental',
    reencuadre:
      'La mente cansada filtra lo bueno. Frente a eso, elige mirar de frente tres cosas concretas que hoy sí recibiste.',
    acciones: [
      'Anota tres cosas por las que agradeces hoy, por pequeñas que parezcan.',
      'Agradece en voz alta a alguien que suele pasar desapercibido.',
    ],
  },
  esperanza: {
    validacion:
      'La esperanza no niega lo difícil: sostiene que no es el final. Aferrarte a ella también es un ejercicio de fe y de fuerza.',
    distorsionId: 'catastrofizacion',
    reencuadre:
      'Cuando el futuro se pinta oscuro, la esperanza pregunta: ¿y si también hay una salida buena? Imagina un desenlace posible y amable.',
    acciones: [
      'Escribe una cosa que esperas y un paso pequeño en esa dirección.',
      'Recuerda una vez que saliste adelante: ¿qué te sostuvo entonces?',
    ],
  },
  cansancio: {
    validacion:
      'El agobio es la forma en que tu cuerpo y tu alma piden pausa. Descansar no es rendirse: es cuidar el instrumento con el que vives.',
    distorsionId: 'todo-o-nada',
    reencuadre:
      'El cansancio dice "o lo hago todo o no sirvo". Cámbialo por "hoy elijo lo esencial y suelto el resto sin culpa".',
    acciones: [
      'Elige una sola prioridad para hoy y da permiso para posponer lo demás.',
      'Regálate una pausa real: agua, aire, silencio o una siesta corta.',
    ],
  },
}

// ------------------------------------------------------------------
// Public API.
// ------------------------------------------------------------------
export function getEmotion(id: string): Emotion | undefined {
  return EMOCIONES.find((e) => e.id === id)
}

/**
 * Returns the full curated content bundle for an emotion.
 * Guaranteed to include a valid verse + at least one action for every
 * emotion in EMOCIONES (covered by tests).
 */
export function getContentForEmotion(emotionId: string): EmotionContent | undefined {
  const emocion = getEmotion(emotionId)
  const raw = CONTENIDO[emotionId]
  const versiculo = VERSICULOS[emotionId]
  const distorsion = raw ? getDistorsion(raw.distorsionId) : undefined
  if (!emocion || !raw || !versiculo || !distorsion) return undefined

  return {
    emocion,
    validacion: raw.validacion,
    distorsion,
    reencuadre: raw.reencuadre,
    versiculo,
    acciones: raw.acciones,
  }
}

export { DISTORSIONES }

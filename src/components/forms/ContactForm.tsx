import { useRef, useState, type FormEvent } from 'react'
import { company } from '../../data/company'
import { trades } from '../../data/leistungen'
import './ContactForm.scss'

type Errors = Partial<Record<'name' | 'email' | 'message' | 'consent', string>>

/**
 * Contact form.
 *
 * There is no backend on this build, so the form does not pretend to send.
 * It validates fully, then hands the visitor a prepared mailto: — the message
 * really does go out, through their own mail client, and nothing is silently
 * dropped. Swap `handoff` for a POST when an endpoint exists; the validation
 * and the states around it stay as they are.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLParagraphElement>(null)

  function validate(data: FormData): Errors {
    const next: Errors = {}
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (name.length < 2) next.name = 'Bitte tragen Sie Ihren Namen ein.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = 'Diese E-Mail-Adresse können wir nicht lesen.'
    if (message.length < 10)
      next.message = 'Ein bis zwei Sätze zu Ihrem Anliegen helfen uns weiter.'
    if (data.get('consent') !== 'on')
      next.consent = 'Ohne Ihre Zustimmung dürfen wir die Anfrage nicht bearbeiten.'
    return next
  }

  function handoff(data: FormData) {
    const topic = String(data.get('topic') ?? '')
    const lines = [
      `Name: ${data.get('name')}`,
      `E-Mail: ${data.get('email')}`,
      data.get('phone') ? `Telefon: ${data.get('phone')}` : null,
      topic ? `Thema: ${topic}` : null,
      '',
      String(data.get('message') ?? ''),
    ].filter(Boolean)

    const subject = topic ? `Anfrage ${topic}` : 'Anfrage über die Website'
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join('\n'))}`
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    // Bots fill hidden fields; people do not.
    if (data.get('website')) return

    const next = validate(data)
    setErrors(next)

    if (Object.keys(next).length > 0) {
      // Send focus to the first field that needs attention.
      const first = Object.keys(next)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    handoff(data)
    setSent(true)
    // Announce the result to screen readers, which do not see the change.
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  return (
    <form className="cf" ref={formRef} onSubmit={onSubmit} noValidate>
      <div className="cf__row">
        <Field
          name="name"
          label="Name"
          required
          autoComplete="name"
          error={errors.name}
        />
        <Field
          name="email"
          label="E-Mail"
          type="email"
          required
          autoComplete="email"
          error={errors.email}
        />
      </div>

      <div className="cf__row">
        <Field
          name="phone"
          label="Telefon"
          hint="Optional"
          type="tel"
          autoComplete="tel"
        />
        <div className="cf__field">
          <label className="cf__label" htmlFor="cf-topic">
            Thema <span className="cf__hint">Optional</span>
          </label>
          <div className="cf__select">
            <select id="cf-topic" name="topic" defaultValue="">
              <option value="">Bitte wählen</option>
              {trades.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
              <option value="Kundendienst">Kundendienst</option>
              <option value="Förderung">Förderung und Beratung</option>
              <option value="Karriere">Karriere</option>
            </select>
            <svg viewBox="0 0 10 6" aria-hidden="true" focusable="false">
              <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </div>
        </div>
      </div>

      <Field
        name="message"
        label="Ihr Anliegen"
        required
        multiline
        error={errors.message}
      />

      {/* Honeypot: off-screen, never announced, never tabbable. */}
      <div className="cf__trap" aria-hidden="true">
        <label htmlFor="cf-website">Website (bitte frei lassen)</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={`cf__consent${errors.consent ? ' has-error' : ''}`}>
        <input
          id="cf-consent"
          name="consent"
          type="checkbox"
          aria-describedby={errors.consent ? 'cf-consent-error' : undefined}
          aria-invalid={errors.consent ? true : undefined}
        />
        <label htmlFor="cf-consent">
          Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner
          Anfrage verwendet werden. Hinweise dazu in der{' '}
          <a href="/datenschutz">Datenschutzerklärung</a>.
        </label>
        {errors.consent && (
          <p className="cf__error" id="cf-consent-error">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="cf__actions">
        <button className="btn btn--primary btn--lg" type="submit">
          <span className="btn__label">Anfrage senden</span>
          <svg className="btn__arrow" viewBox="0 0 20 12" aria-hidden="true" focusable="false">
            <path d="M0 6h17.5M12.5 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.15" vectorEffect="nonScalingStroke" />
          </svg>
        </button>
      </div>

      {/* Both states live in one polite region so nothing is announced twice. */}
      <p
        className={`cf__status${sent ? ' is-sent' : ''}`}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        ref={statusRef}
      >
        {sent
          ? `Ihr E-Mail-Programm sollte sich mit der fertigen Nachricht geöffnet haben. Falls nicht, schreiben Sie bitte direkt an ${company.email}.`
          : ''}
      </p>
    </form>
  )
}

/* -------------------------------------------------------------------------- */

interface FieldProps {
  name: string
  label: string
  type?: string
  hint?: string
  required?: boolean
  multiline?: boolean
  autoComplete?: string
  error?: string
}

/** One labelled control, with its error wired up via aria-describedby. */
function Field({
  name,
  label,
  type = 'text',
  hint,
  required,
  multiline,
  autoComplete,
  error,
}: FieldProps) {
  const id = `cf-${name}`
  const errorId = `${id}-error`
  const shared = {
    id,
    name,
    autoComplete,
    required,
    'aria-invalid': error ? (true as const) : undefined,
    'aria-describedby': error ? errorId : undefined,
  }

  return (
    <div className={`cf__field${error ? ' has-error' : ''}`}>
      <label className="cf__label" htmlFor={id}>
        {label}
        {hint && <span className="cf__hint">{hint}</span>}
        {required && (
          <span className="cf__req" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {multiline ? (
        <textarea {...shared} rows={6} />
      ) : (
        <input {...shared} type={type} />
      )}
      {error && (
        <p className="cf__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

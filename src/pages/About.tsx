import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  CalendarDays,
  ListChecks,
  Plus,
  RefreshCw,
  Send,
  User,
  Vote,
} from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { categories } from '../data/categories'
import { EVENT } from '../data/event'
import { telegramChannels, telegramContacts } from '../data/contacts'
import { usePageTitle } from '../hooks/usePageTitle'

const timeline = [
  {
    date: 'до 13 ноября',
    title: 'Этап I · Предложение номинантов',
    text: 'Сообщество предлагало номинантов и сами номинации. Приём предложений завершён — список первого сезона сформирован.',
  },
  {
    date: '14 ноября — 20 декабря',
    title: 'Этап II · Голосование',
    text: 'В каждой из 17 номинаций — один голос. Выбор можно изменить до конца голосования.',
  },
  {
    date: '27 декабря',
    title: 'Победители',
    text: 'Объявляем первых победителей ITD AWARDS — только имена, золото и благодарности сообществу.',
  },
]

const rules = [
  {
    icon: Vote,
    title: 'Один голос в номинации',
    text: 'В каждой из 17 категорий можно поддержать только одного номинанта. Выбирайте сердцем.',
  },
  {
    icon: ListChecks,
    title: 'Номинанты уже собраны',
    text: 'Первый этап завершился 13 ноября. Список сформирован по предложениям сообщества.',
  },
  {
    icon: RefreshCw,
    title: 'Можно передумать',
    text: 'Голос меняется до конца голосования. Откройте номинацию и нажмите «Изменить голос».',
  },
  {
    icon: User,
    title: 'Без регистрации',
    text: 'В демо-версии голос привязан к браузеру. Один набор голосов — одна честная попытка.',
  },
]

const faq = [
  {
    question: 'Нужна ли регистрация?',
    answer:
      'Нет. В этом прототипе не нужны почта, пароль или аккаунт в соцсетях. Голос сохраняется локально в браузере, чтобы можно было спокойно вернуться и продолжить.',
  },
  {
    question: 'Куда отправляются мои голоса?',
    answer:
      'Никуда. Это фронтенд-прототип без сервера и базы данных. Выбор хранится в localStorage браузера и остаётся только на вашем устройстве.',
  },
  {
    question: 'Можно ли ещё предложить номинанта?',
    answer:
      'Первый этап завершился 13 ноября, список номинантов зафиксирован. Сейчас идёт второй этап — голосование за тех, кто уже в списке.',
  },
  {
    question: 'Можно ли изменить голос после сохранения?',
    answer:
      'Да, до конца голосования. Откройте категорию, нажмите «Изменить голос», обновите выбор и сохраните его снова. Прогресс и прошлые голоса не потеряются.',
  },
  {
    question: 'Когда объявят победителей?',
    answer: `Победителей объявим ${EVENT.winnersLabel}. Итоги появятся на сайте и в сообществе ITD.`,
  },
  {
    question: 'Почему в некоторых номинациях несколько номинантов?',
    answer:
      'Список каждого сезона формирует сообщество. В каждой категории несколько участников, но голос только один.',
  },
]

export function About() {
  usePageTitle('О премии')

  return (
    <div className="about-page">
      <PageHero
        eyebrow="О премии"
        title={
          <>
            Премия для тех,
            <br />
            кто делает ITD <em>живым.</em>
          </>
        }
        description="ITD AWARDS — первая премия сообщества. Мы вспоминаем лучшие проекты, людей, мемы и события 2026 года — и говорим им спасибо своим голосом."
        ghost="ITD"
        aside={
          <div className="about-facts">
            <div>
              <strong>01</strong>
              <span>первый сезон</span>
            </div>
            <div>
              <strong>{categories.length}</strong>
              <span>номинаций</span>
            </div>
          </div>
        }
      />

      <section className="section about-intro">
        <div className="container about-intro__grid">
          <Reveal>
            <p className="eyebrow">Манифест</p>
            <h2 className="display display--lg">
              Мы выбираем не
              <br />
              <em>самых громких</em>,
              <br />
              а самых своих.
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="about-intro__lead">
              Премии часто измеряются цифрами. Нам же важнее другое: кто придумал
              проект, который вы обсуждали неделю, кто поддержал в трудный день, чей
              кадр стал аватаркой, а чья шутка до сих пор живёт в переписке.
            </p>
            <p>
              ITD AWARDS — первая возможность признать вклад тех, кто делает
              сообщество живым. Без рейтингов подписчиков, без сложных условий и без
              ощущения, что вы голосуете «за кого-то не того».
            </p>
            <blockquote className="about-quote">
              «Золото получает не тот, кого чаще показывают, а тот, кого действительно
              помнят».
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="section about-timeline" aria-labelledby="timeline-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Календарь</p>
              <h2 className="display" id="timeline-title">
                Как проходит сезон
              </h2>
            </div>
            <p className="section-head__note">
              Два этапа — от предложений сообщества до первых имён.
            </p>
          </div>
          <div className="timeline" role="list">
            {timeline.map((item, index) => (
              <Reveal key={item.date} delay={index * 60}>
                <div className="timeline__item" role="listitem">
                  <span className="timeline__dot" aria-hidden="true" />
                  <span className="timeline__date">
                    <CalendarDays size={13} aria-hidden="true" />
                    {item.date}
                  </span>
                  <div className="timeline__body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <span className="timeline__number" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-rules" id="rules" aria-labelledby="rules-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Правила</p>
              <h2 className="display" id="rules-title">
                Честно и просто
              </h2>
            </div>
            <p className="section-head__note">
              Никаких скрытых условий. Только выбор сообщества.
            </p>
          </div>
          <div className="rules-grid">
            {rules.map((rule, index) => {
              const Icon = rule.icon
              return (
                <Reveal key={rule.title} delay={index * 70}>
                  <article className="rule-card">
                    <span className="rule-card__number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span className="rule-card__icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.7} />
                    </span>
                    <h3>{rule.title}</h3>
                    <p>{rule.text}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
          <p className="rules-note">
            Это демонстрационный интерфейс. Правила настоящей премии могут отличаться, а
            все имена и номинации здесь вымышлены.
          </p>
        </div>
      </section>

      <section className="section about-faq" id="faq" aria-labelledby="faq-title">
        <div className="container about-faq__grid">
          <Reveal>
            <p className="eyebrow">Вопросы</p>
            <h2 className="display" id="faq-title">
              Коротко <em>о главном</em>
            </h2>
            <p className="about-faq__note">
              Если не нашли ответ — напишите нам. Мы читаем всё, даже сообщения в три
              часа ночи.
            </p>
            <a href="#contacts" className="link-inline">
              Написать нам
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal delay={80}>
            <div className="faq">
              {faq.map((item) => (
                <details key={item.question}>
                  <summary>
                    <span>{item.question}</span>
                    <Plus className="faq__icon" size={18} aria-hidden="true" />
                  </summary>
                  <p className="faq__answer">{item.answer}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section about-contacts" id="contacts" aria-labelledby="contacts-title">
        <div className="container">
          <div className="contacts-card">
            <div>
              <p className="eyebrow">На связи</p>
              <h2 className="display" id="contacts-title">
                Есть идея или вопрос?
              </h2>
              <p>
                Все вопросы, предложения и идеи — в Telegram. Пишите в каналы премии
                или лично команде.
              </p>
            </div>
            <div className="contacts-card__actions">
              <div className="contacts-card__channels">
                {telegramChannels.map((channel, index) => (
                  <a
                    key={channel.href}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`button ${index === 0 ? 'button--gold' : 'button--ghost'}`}
                  >
                    <Send size={16} aria-hidden="true" />
                    {channel.label}
                  </a>
                ))}
              </div>
              <div className="contacts-card__people">
                {telegramContacts.map((contact) => (
                  <a key={contact.href} href={contact.href} target="_blank" rel="noreferrer">
                    <Send size={14} aria-hidden="true" />
                    {contact.label}
                  </a>
                ))}
              </div>
            </div>
            <span className="contacts-card__ghost" aria-hidden="true">
              ITD
            </span>
          </div>
          <div className="about-bottom">
            <p>Готовы выбрать своих?</p>
            <Link to="/nominations" className="button button--cream">
              Перейти к номинациям
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

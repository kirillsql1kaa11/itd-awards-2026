import { Link } from 'react-router-dom'
import { ArrowUpRight, Plus, Send } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { categories } from '../data/categories'
import { EVENT } from '../data/event'
import { telegramChannels, telegramContacts } from '../data/contacts'
import { usePageTitle } from '../hooks/usePageTitle'

const faq = [
  {
    question: 'Нужна ли регистрация?',
    answer:
      'Нет. Почта, пароль и аккаунт в соцсетях не нужны. Голос сохраняется локально в браузере, чтобы можно было спокойно вернуться и продолжить.',
  },
  {
    question: 'Куда отправляются мои голоса?',
    answer:
      'Это фронтенд-прототип без сервера и базы данных. Выбор хранится в localStorage браузера и остаётся только на вашем устройстве.',
  },
  {
    question: 'Можно ли ещё предложить номинанта?',
    answer:
      'Первый этап завершился 13 ноября, список номинантов зафиксирован. Сейчас идёт второй этап — голосование за тех, кто уже в списке.',
  },
  {
    question: 'Можно ли изменить голос после сохранения?',
    answer:
      'Да, до конца голосования. Откройте категорию, нажмите «Изменить голос», обновите выбор и сохраните его снова.',
  },
  {
    question: 'Когда объявят победителей?',
    answer: `Победителей объявим ${EVENT.winnersLabel}. Итоги появятся на сайте и в сообществе ИТД ИТП.`,
  },
  {
    question: 'Почему в некоторых номинациях несколько номинантов?',
    answer:
      'Список каждого сезона формирует сообщество. В каждой категории несколько участников, но голос только один.',
  },
]

export function Questions() {
  usePageTitle('Вопросы')

  return (
    <div className="questions-page">
      <PageHero
        eyebrow="Вопросы"
        title={
          <>
            Номинанты собраны.
            <br />
            <em>Вопросы?</em>
          </>
        }
        description="Всё о голосовании, сохранении выбора и датах сезона — коротко и по делу."
        ghost="FAQ"
        aside={
          <div className="about-facts">
            <div>
              <strong>{categories.length}</strong>
              <span>номинаций</span>
            </div>
            <div>
              <strong>01</strong>
              <span>голос в каждой</span>
            </div>
          </div>
        }
      />

      <section className="section about-faq" id="faq" aria-labelledby="faq-title">
        <div className="container about-faq__grid">
          <Reveal>
            <p className="eyebrow">Коротко о главном</p>
            <h2 className="display" id="faq-title">
              Частые <em>вопросы</em>
            </h2>
            <p className="about-faq__note">
              Не нашли ответ — напишите в Telegram. Отвечаем на всё, даже на сообщения
              в три часа ночи.
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
                Остались вопросы?
              </h2>
              <p>
                Пишите в Telegram. Канал ИТД ИТП — новости премии, @sneyr — прямой
                контакт для вопросов и предложений.
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

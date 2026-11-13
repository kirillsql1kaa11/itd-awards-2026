export type CategoryGroup = 'people' | 'content' | 'community'

export type Nominee = {
  id: string
  name: string
  handle: string
  tagline: string
  votes: number
}

export type Category = {
  id: string
  title: string
  group: CategoryGroup
  description: string
  nominees: Nominee[]
}

export const groupLabels: Record<CategoryGroup, string> = {
  people: 'Люди',
  content: 'Контент',
  community: 'Сообщество',
}

function nominee(
  id: string,
  name: string,
  handle: string,
  tagline: string,
  votes: number,
): Nominee {
  return { id, name, handle, tagline, votes }
}

function category(
  id: string,
  title: string,
  group: CategoryGroup,
  description: string,
  nominees: Nominee[],
): Category {
  return { id, title, group, description, nominees }
}

export const categories: Category[] = [
  category(
    'king-itd',
    'KING ИТД',
    'people',
    'Тот, кто задаёт тон, собирает вокруг себя людей и делает сообщество громче. Один голос — один король.',
    [
      nominee('mark-morph', 'Марк «MORPH» Ветров', '@morphcore', 'Собрал вокруг себя полсообщества и никого не потерял.', 942),
      nominee('danya-nocturne', 'Даня Ноктюрн', '@nocturne', 'Ночной голос ITD и автор главных тредов года.', 671),
      nominee('alex-sable', 'Алекс «Sable»', '@sable', 'Архитектор движа, мемов и внезапных коллабов.', 808),
      nominee('ilya-orlov', 'Илья Орлов', '@orlov', 'Человек-эфир: всегда рядом, всегда с идеей.', 517),
    ],
  ),
  category(
    'queen-itd',
    'QUEEN ИТД',
    'people',
    'Голос, вкус и харизма, которые невозможно не заметить. В этом году королеву выбираете вы.',
    [
      nominee('eva-mirage', 'Ева Мираж', '@eva_mirage', 'Умеет превратить обычный вечер в событие.', 884),
      nominee('sonya-velvet', 'Соня Вельвет', '@velvetsonya', 'Вкус, тексты и бархатный голос сообщества.', 744),
      nominee('nika-astra', 'Ника Астра', '@astra_nika', 'Харизма, после которой хочется остаться.', 912),
      nominee('mila-ray', 'Мила Рэй', '@milaray', 'Свет, ирония и очень точные мемы.', 628),
    ],
  ),
  category(
    'ship-goda',
    'Шип года',
    'community',
    'Самая громкая пара года — по версии сообщества. Любовь, дружба и немного драмы.',
    [
      nominee('liza-artem', 'Лиза × Артём', '#тихийшторм', 'Самый тихий роман, который заметили все.', 731),
      nominee('kira-max', 'Кира × Макс', '#неонlove', 'Неон, музыка и скриншоты на четыре тысячи реакций.', 648),
      nominee('asya-yan', 'Ася × Ян', '#двекометы', 'Две орбиты, которые наконец пересеклись.', 802),
      nominee('nastya-grisha', 'Настя × Гриша', '#пополам', 'Делили всё пополам — даже внимание сообщества.', 522),
    ],
  ),
  category(
    'artist-goda',
    'Художник года',
    'people',
    'Работы, которые хочется сохранить в папку «вдохновение». Голос за самый узнаваемый визуал года.',
    [
      nominee('aquarelle-kid', 'Aquarelle Kid', '@aquarellekid', 'Акварели, от которых пахнет летом и пылью.', 497),
      nominee('lena-vox', 'LENA VOX', '@lenavox', 'Смелые формы, громкие цвета и ни одного лишнего мазка.', 763),
      nominee('artem-nebo', 'Артём Небо', '@neboart', 'Рисует небо так, будто видел его изнутри.', 681),
      nominee('wooloo', 'woolloomooloo', '@wooloo', 'Тёплые персонажи и вселенная, в которую хочется вернуться.', 588),
    ],
  ),
  category(
    'meme-goda',
    'Мем года',
    'content',
    'Шутка, которая пережила свой дедлайн и до сих пор живёт в чатах. Выбираем самый вирусный мем.',
    [
      nominee('kot-admin', '«Кот-админ»', '@cat_admin', 'Проверял заявки и стал главным мемом сезона.', 921),
      nominee('nu-eto-baza', '«Ну это база»', '@nu_eto_baza', 'Фраза, которая пережила все обсуждения.', 837),
      nominee('astral-exit', '«Ушёл в астрал»', '@astral_exit', 'Идеальный ответ на любой дедлайн.', 604),
      nominee('slowbro', '«Слоу-бро»', '@slowbro', 'Реакция, которая работает быстрее всех.', 715),
    ],
  ),
  category(
    'news-goda',
    'Новостной паблик года',
    'content',
    'Туда, куда мы идём за правдой и скринами. Пять минут без воды — и вы в курсе.',
    [
      nominee('itd-daily', 'ITD DAILY', '@itddaily', 'Новости без воды, паники и лишних скобок.', 864),
      nominee('shum-yarost', '«Шум и Ярость»', '@shum_i_yarost', 'Громкий взгляд на тихие новости.', 553),
      nominee('okno-itd', '«Окно в ИТД»', '@okno_itd', 'Показывает то, что другие пропустили.', 702),
      nominee('signal-noise', '«Сигнал / Noise»', '@signalnoise', 'Разбирает шум на смыслы каждое утро.', 619),
    ],
  ),
  category(
    'streamer-goda',
    'Стример года',
    'people',
    'Эфиры, ради которых мы ставим будильник. За атмосферу, смелость и умение держать чат.',
    [
      nominee('kira-exe', 'kira.exe', '@kira_exe', 'Эфиры, после которых хочется выспаться и повторить.', 958),
      nominee('molchun', 'MOLCHUN', '@molchun', 'Молчит громче всех в чате.', 647),
      nominee('tony-afterdark', 'tony_afterdark', '@tonyafterdark', 'После полуночи начинается его лучшее время.', 782),
      nominee('dasha-live', 'dasha.live', '@dashalive', 'Уютный лайв с музыкой, кофе и честными разговорами.', 706),
    ],
  ),
  category(
    'cosplay-goda',
    'Косплей года',
    'content',
    'Перевоплощение, в которое веришь больше, чем в оригинал. Костюмы, детали и характер.',
    [
      nominee('jellyfish-queen', 'Jellyfish Queen', '@jellyfishqueen', 'Костюм, который поплыл прямо в сердца.', 833),
      nominee('cyber-baba', 'Cyber Baba', '@cyber_baba', 'Бабушка с кибер-имплантами, которую мы не заслужили.', 714),
      nominee('rina-cos', 'Rina Cosplay', '@rinacos', 'Точность в деталях и полное перевоплощение.', 652),
      nominee('hexa-cos', 'HEXA', '@hexacos', 'Шесть образов — один победитель?', 542),
    ],
  ),
  category(
    'zavoz-goda',
    'Завоз года',
    'community',
    'Самый красивый, неожиданный и нужный завоз. То, что приехало вовремя или изменило всё.',
    [
      nominee('neon-import', '«Неоновый завоз»', '@neon_import', 'Привёз свет туда, где было слишком темно.', 677),
      nominee('box-treasure', '«Коробка с сокровищами»', '@box_treasure', 'Внутри было всё, о чём вы просили в чате.', 781),
      nominee('market-detected', '«Маркет детектед»', '@marketdetected', 'Нашёл то, чего не было в наличии ни у кого.', 614),
      nominee('vibe-2007', '«Вайб 2007»', '@vibe2007', 'Ностальгия, доставленная без задержек.', 546),
    ],
  ),
  category(
    'event-goda',
    'Событие года',
    'community',
    'День, о котором потом рассказывали месяц. Офлайн, онлайн и всё, что между ними.',
    [
      nominee('itd-night', 'ITD NIGHT 2026', '@itdnight', 'Ночь, после которой чат не замолкал неделю.', 921),
      nominee('pixel-fest', '«Пиксель-фест»', '@pixelfest', 'Праздник для тех, кто вырос на кнопках.', 688),
      nominee('quiet-party', '«Тихая вечеринка»', '@quietparty', 'Танцевали даже те, кто пришёл просто посидеть.', 574),
      nominee('art-sea', '«Арт-маркет у моря»', '@artseamarket', 'Море, крафт и очень много открыток.', 643),
    ],
  ),
  category(
    'project-goda',
    'Проект года',
    'community',
    'То, что выросло из идеи в целую вселенную. Голос за проект, который двигает ITD вперёд.',
    [
      nominee('podcast-nn', '«Подкаст без названия»', '@podcastnn', 'Голос, который включают на длинной дороге.', 719),
      nominee('anonymous-art', '«Клуб анонимных художников»', '@anonymous_art', 'Место, где можно рисовать и не бояться.', 632),
      nominee('itd-wiki', 'ITD Wiki', '@itdwiki', 'Собрал историю сообщества в одном месте.', 855),
      nominee('svet-okne', '«Свет в окне»', '@svet_v_okne', 'Проект, после которого стало чуть теплее.', 691),
    ],
  ),
  category(
    'track-goda',
    'Трек года',
    'content',
    'Трек, который звучал громче всего в этом году. Один голос — один победитель.',
    [
      nominee('northern-noise', '«Северный шум» — Lowkey Lera', '@lowkeylera', 'Гимн тех, кто едет домой в последнем вагоне.', 801),
      nominee('dust-vhs', '«Пыль» — VHS Dream', '@vhsdream', 'Ностальгия на скорости 33 оборота.', 659),
      nominee('dont-let-go', '«Не отпускай» — miro', '@miromusic', 'Припев, который остаётся на весь день.', 720),
      nominee('silence-online', '«Тишина в сети» — No Signal', '@nosignal', 'Тихий трек с очень громким послевкусием.', 587),
      nominee('slowly', '«Медленно» — рассвет', '@rassvet', 'Для моментов, когда спешить уже некуда.', 493),
    ],
  ),
  category(
    'dobryak-goda',
    'Добряк года',
    'people',
    'Тот, кто согрел ITD без повода. Помощь, поддержка и добро, которое не просит лайков.',
    [
      nominee('masha-plus', 'Маша «плюс один»', '@plus_one', 'Всегда добавит тебя в список, даже если список закрыт.', 823),
      nominee('kostya-lantern', 'Костя Фонарь', '@kostya_lantern', 'Подсвечивает путь без лишних слов.', 710),
      nominee('anya-tea', 'Аня «чай»', '@anya_tea', 'Заливает чай и вытаскивает из плохого дня.', 664),
      nominee('dr-hug', 'Dr. Hug', '@dr_hug', 'Официально не врач, но лечит лучше многих.', 541),
    ],
  ),
  category(
    'interactive-goda',
    'Интерактив года',
    'community',
    'Лучший совместный движ сообщества. Один голос за проект, который затянул сильнее всех.',
    [
      nominee('quiet-chat', '«Тихий чат»', '@quietchat', 'Место, где можно молчать вместе.', 637),
      nominee('itd-hq', '«Штаб ITD»', '@itdhq', 'Координация, которая выглядела как магия.', 744),
      nominee('mem-factory', '«Мем-фабрика»', '@memfactory', 'Производство смеха без выходных.', 812),
      nominee('photo-hunt', '«Фотоохота»', '@photohunt', 'Заставил всех смотреть по сторонам.', 529),
      nominee('voting-club', '«Голосовалка»', '@votingclub', 'Спортивный интерес в чистом виде.', 688),
    ],
  ),
  category(
    'interview-goda',
    'Интервью года',
    'community',
    'Разговор, после которого захотелось думать. Один голос за интервью, которое осталось с вами.',
    [
      nominee('after-midnight', '«После полуночи»', '@aftermidnight', 'Разговоры, которые не помещаются в таймкод.', 706),
      nominee('hard-questions', '«Неудобные вопросы»', '@hardquestions', 'Спрашивает то, что другие постеснялись.', 621),
      nominee('eye-to-eye', '«С глазу на глаз»', '@eye2eye', 'Тихо, честно и без подготовки.', 578),
      nominee('honestly', '«Честно говоря»', '@honestly', 'Интервью, после которых меняют мнение.', 649),
      nominee('room-404', '«Комната 404»', '@room404', 'Там, где находят друг друга.', 512),
    ],
  ),
  category(
    'photographer-goda',
    'Фотограф года',
    'people',
    'Кадр, который стал воспоминанием. Свет, момент и взгляд, который сложно повторить.',
    [
      nominee('liza-svet', 'Лиза Свет', '@lizasvet', 'Ловит свет там, где остальные видят тень.', 739),
      nominee('frame-seven', 'Кадр №7', '@frame7', 'Седьмой кадр всегда оказывается главным.', 682),
      nominee('misha-shadow', 'Миша Тень', '@mishaten', 'Тёмные кадры с очень светлым смыслом.', 596),
      nominee('glow-exe', 'Glow.exe', '@glowexe', 'Пересвет как художественный приём.', 528),
    ],
  ),
  category(
    'shitposter-goda',
    'Щитпостер года',
    'content',
    'Смеёмся, но любим. Голос за того, чей абсурд держал сообщество на плаву весь год.',
    [
      nominee('shitpost-daily', 'shitpost.daily', '@shitpostdaily', 'Поставляет абсурд в промышленных масштабах.', 861),
      nominee('mem-ded', '«Мемный дед»', '@memded', 'Видел все мемы до того, как они стали мемами.', 732),
      nominee('tired-public', '«Паблик, который устал»', '@tiredpublic', 'Устал, но продолжает.', 684),
      nominee('toxic-positive', '«Токсичный позитив»', '@toxicpositive', 'Улыбается так, что становится не по себе.', 557),
    ],
  ),
]

export const totalNominees = categories.reduce(
  (total, categoryItem) => total + categoryItem.nominees.length,
  0,
)

export function getCategory(categoryId: string | undefined): Category | undefined {
  return categories.find((categoryItem) => categoryItem.id === categoryId)
}

export function getNominee(categoryItem: Category, nomineeId: string): Nominee | undefined {
  return categoryItem.nominees.find((nomineeItem) => nomineeItem.id === nomineeId)
}


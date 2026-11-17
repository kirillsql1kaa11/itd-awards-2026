export type CategoryGroup = 'people' | 'content' | 'community'

export type Nominee = {
  id: string
  name: string
  handle: string
  tagline: string
  song?: string
  photo?: string
  photoAlt?: string
  audio?: string
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

const nomineePhotos: Record<string, { src: string; alt: string }> = {
  'kot-admin': {
    src: '/images/meme-kot-admin.svg',
    alt: 'Серый кот в очках за рабочим столом с ноутбуком и тёплой лампой',
  },
  'nu-eto-baza': {
    src: '/images/meme-nu-eto-baza.svg',
    alt: 'Рука ставит тяжёлую печать на стопку документов в луче света',
  },
  'astral-exit': {
    src: '/images/meme-astral-exit.svg',
    alt: 'Силуэт человека в пальто уходит в светящийся фиолетовый портал',
  },
  slowbro: {
    src: '/images/meme-slowbro.svg',
    alt: 'Ленивец в наушниках лежит в гамаке в тёмной комнате',
  },
  'podcast-nn': {
    src: '/images/project-podcast-nn.svg',
    alt: 'Студия подкаста с двумя микрофонами и тёплым светом лампы',
  },
  'anonymous-art': {
    src: '/images/project-anonymous-art.svg',
    alt: 'Ночная художественная мастерская с мольбертами и холстами',
  },
  'itd-wiki': {
    src: '/images/project-itd-wiki.svg',
    alt: 'Архив с картотекой и светящимся экраном, человек у стола',
  },
  'svet-okne': {
    src: '/images/project-svet-okne.svg',
    alt: 'Тёмный фасад дома с одним тёплым светящимся окном',
  },
  'neon-import': {
    src: '/images/zavoz-neon-import.svg',
    alt: 'Фургон с открытыми дверями и неоновым светом на ночной улице',
  },
  'box-treasure': {
    src: '/images/zavoz-box-treasure.svg',
    alt: 'Открытый деревянный ящик со светящимися сокровищами',
  },
  'market-detected': {
    src: '/images/zavoz-market-detected.svg',
    alt: 'Ночной маркет с редкими вещами и человеком с фонарём',
  },
  'vibe-2007': {
    src: '/images/zavoz-vibe-2007.svg',
    alt: 'Комната с ЭЛТ-монитором, наушниками и закатным светом',
  },
  'itd-night': {
    src: '/images/event-itd-night.svg',
    alt: 'Ночная вечеринка на крыше под гирляндами с танцующими силуэтами',
  },
  'pixel-fest': {
    src: '/images/event-pixel-fest.svg',
    alt: 'Фестиваль аркадных автоматов с неоновой подсветкой',
  },
  'quiet-party': {
    src: '/images/event-quiet-party.svg',
    alt: 'Тихая вечеринка в уютной комнате с тёплым светом',
  },
  'art-sea': {
    src: '/images/event-art-sea.svg',
    alt: 'Арт-маркет у моря на закате с палатками и картинами',
  },
}

const nomineeAudio: Record<string, string> = {
  'northern-noise': '/audio/northern-noise.wav',
  'dust-vhs': '/audio/dust-vhs.wav',
  'dont-let-go': '/audio/dont-let-go.wav',
  'silence-online': '/audio/silence-online.wav',
  slowly: '/audio/slowly.wav',
}

function nominee(
  id: string,
  name: string,
  handle: string,
  tagline: string,
  song?: string,
): Nominee {
  const photo = nomineePhotos[id]
  return {
    id,
    name,
    handle,
    tagline,
    song,
    photo: photo?.src,
    photoAlt: photo?.alt,
    audio: nomineeAudio[id],
  }
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
      nominee('mark-morph', 'Марк «MORPH» Ветров', '@morphcore', 'Собрал вокруг себя полсообщества и никого не потерял.'),
      nominee('danya-nocturne', 'Даня Ноктюрн', '@nocturne', 'Ночной голос ITD и автор главных тредов года.'),
      nominee('alex-sable', 'Алекс «Sable»', '@sable', 'Архитектор движа, мемов и внезапных коллабов.'),
      nominee('ilya-orlov', 'Илья Орлов', '@orlov', 'Человек-эфир: всегда рядом, всегда с идеей.'),
    ],
  ),
  category(
    'queen-itd',
    'QUEEN ИТД',
    'people',
    'Голос, вкус и харизма, которые невозможно не заметить. В этом году королеву выбираете вы.',
    [
      nominee('eva-mirage', 'Ева Мираж', '@eva_mirage', 'Умеет превратить обычный вечер в событие.'),
      nominee('sonya-velvet', 'Соня Вельвет', '@velvetsonya', 'Вкус, тексты и бархатный голос сообщества.'),
      nominee('nika-astra', 'Ника Астра', '@astra_nika', 'Харизма, после которой хочется остаться.'),
      nominee('mila-ray', 'Мила Рэй', '@milaray', 'Свет, ирония и очень точные мемы.'),
    ],
  ),
  category(
    'ship-goda',
    'Шип года',
    'community',
    'Самая громкая пара года — по версии сообщества. Любовь, дружба и немного драмы.',
    [
      nominee('liza-artem', 'Лиза × Артём', '#тихийшторм', 'Самый тихий роман, который заметили все.'),
      nominee('kira-max', 'Кира × Макс', '#неонlove', 'Неон, музыка и скриншоты на четыре тысячи реакций.'),
      nominee('asya-yan', 'Ася × Ян', '#двекометы', 'Две орбиты, которые наконец пересеклись.'),
      nominee('nastya-grisha', 'Настя × Гриша', '#пополам', 'Делили всё пополам — даже внимание сообщества.'),
    ],
  ),
  category(
    'artist-goda',
    'Художник года',
    'people',
    'Работы, которые хочется сохранить в папку «вдохновение». Голос за самый узнаваемый визуал года.',
    [
      nominee('aquarelle-kid', 'Aquarelle Kid', '@aquarellekid', 'Акварели, от которых пахнет летом и пылью.'),
      nominee('lena-vox', 'LENA VOX', '@lenavox', 'Смелые формы, громкие цвета и ни одного лишнего мазка.'),
      nominee('artem-nebo', 'Артём Небо', '@neboart', 'Рисует небо так, будто видел его изнутри.'),
      nominee('wooloo', 'woolloomooloo', '@wooloo', 'Тёплые персонажи и вселенная, в которую хочется вернуться.'),
    ],
  ),
  category(
    'meme-goda',
    'Мем года',
    'content',
    'Шутка, которая пережила свой дедлайн и до сих пор живёт в чатах. Выбираем самый вирусный мем.',
    [
      nominee('kot-admin', '«Кот-админ»', '@cat_admin', 'Проверял заявки и стал главным мемом сезона.'),
      nominee('nu-eto-baza', '«Ну это база»', '@nu_eto_baza', 'Фраза, которая пережила все обсуждения.'),
      nominee('astral-exit', '«Ушёл в астрал»', '@astral_exit', 'Идеальный ответ на любой дедлайн.'),
      nominee('slowbro', '«Слоу-бро»', '@slowbro', 'Реакция, которая работает быстрее всех.'),
    ],
  ),
  category(
    'news-goda',
    'Новостной паблик года',
    'content',
    'Туда, куда мы идём за правдой и скринами. Пять минут без воды — и вы в курсе.',
    [
      nominee('itd-daily', 'ITD DAILY', '@itddaily', 'Новости без воды, паники и лишних скобок.'),
      nominee('shum-yarost', '«Шум и Ярость»', '@shum_i_yarost', 'Громкий взгляд на тихие новости.'),
      nominee('okno-itd', '«Окно в ИТД»', '@okno_itd', 'Показывает то, что другие пропустили.'),
      nominee('signal-noise', '«Сигнал / Noise»', '@signalnoise', 'Разбирает шум на смыслы каждое утро.'),
    ],
  ),
  category(
    'streamer-goda',
    'Стример года',
    'people',
    'Эфиры, ради которых мы ставим будильник. За атмосферу, смелость и умение держать чат.',
    [
      nominee('kira-exe', 'kira.exe', '@kira_exe', 'Эфиры, после которых хочется выспаться и повторить.'),
      nominee('molchun', 'MOLCHUN', '@molchun', 'Молчит громче всех в чате.'),
      nominee('tony-afterdark', 'tony_afterdark', '@tonyafterdark', 'После полуночи начинается его лучшее время.'),
      nominee('dasha-live', 'dasha.live', '@dashalive', 'Уютный лайв с музыкой, кофе и честными разговорами.'),
    ],
  ),
  category(
    'cosplay-goda',
    'Косплей года',
    'content',
    'Перевоплощение, в которое веришь больше, чем в оригинал. Костюмы, детали и характер.',
    [
      nominee('jellyfish-queen', 'Jellyfish Queen', '@jellyfishqueen', 'Костюм, который поплыл прямо в сердца.', '«Глубина» — NEREID'),
      nominee('cyber-baba', 'Cyber Baba', '@cyber_baba', 'Бабушка с кибер-имплантами, которую мы не заслужили.', '«Байт за байтом» — CYBERBABA'),
      nominee('rina-cos', 'Rina Cosplay', '@rinacos', 'Точность в деталях и полное перевоплощение.', '«Второй образ» — RINA'),
      nominee('hexa-cos', 'HEXA', '@hexacos', 'Шесть образов — один победитель?', '«Шесть теней» — HEXA'),
    ],
  ),
  category(
    'zavoz-goda',
    'Завоз года',
    'community',
    'Самый красивый, неожиданный и нужный завоз. То, что приехало вовремя или изменило всё.',
    [
      nominee('neon-import', '«Неоновый завоз»', '@neon_import', 'Привёз свет туда, где было слишком темно.'),
      nominee('box-treasure', '«Коробка с сокровищами»', '@box_treasure', 'Внутри было всё, о чём вы просили в чате.'),
      nominee('market-detected', '«Маркет детектед»', '@marketdetected', 'Нашёл то, чего не было в наличии ни у кого.'),
      nominee('vibe-2007', '«Вайб 2007»', '@vibe2007', 'Ностальгия, доставленная без задержек.'),
    ],
  ),
  category(
    'event-goda',
    'Событие года',
    'community',
    'День, о котором потом рассказывали месяц. Офлайн, онлайн и всё, что между ними.',
    [
      nominee('itd-night', 'ITD NIGHT 2026', '@itdnight', 'Ночь, после которой чат не замолкал неделю.'),
      nominee('pixel-fest', '«Пиксель-фест»', '@pixelfest', 'Праздник для тех, кто вырос на кнопках.'),
      nominee('quiet-party', '«Тихая вечеринка»', '@quietparty', 'Танцевали даже те, кто пришёл просто посидеть.'),
      nominee('art-sea', '«Арт-маркет у моря»', '@artseamarket', 'Море, крафт и очень много открыток.'),
    ],
  ),
  category(
    'project-goda',
    'Проект года',
    'community',
    'То, что выросло из идеи в целую вселенную. Голос за проект, который двигает ITD вперёд.',
    [
      nominee('podcast-nn', '«Подкаст без названия»', '@podcastnn', 'Голос, который включают на длинной дороге.'),
      nominee('anonymous-art', '«Клуб анонимных художников»', '@anonymous_art', 'Место, где можно рисовать и не бояться.'),
      nominee('itd-wiki', 'ITD Wiki', '@itdwiki', 'Собрал историю сообщества в одном месте.'),
      nominee('svet-okne', '«Свет в окне»', '@svet_v_okne', 'Проект, после которого стало чуть теплее.'),
    ],
  ),
  category(
    'track-goda',
    'Трек года',
    'content',
    'Трек, который звучал громче всего в этом году. Один голос — один победитель.',
    [
      nominee('northern-noise', '«Северный шум» — Lowkey Lera', '@lowkeylera', 'Гимн тех, кто едет домой в последнем вагоне.'),
      nominee('dust-vhs', '«Пыль» — VHS Dream', '@vhsdream', 'Ностальгия на скорости 33 оборота.'),
      nominee('dont-let-go', '«Не отпускай» — miro', '@miromusic', 'Припев, который остаётся на весь день.'),
      nominee('silence-online', '«Тишина в сети» — No Signal', '@nosignal', 'Тихий трек с очень громким послевкусием.'),
      nominee('slowly', '«Медленно» — рассвет', '@rassvet', 'Для моментов, когда спешить уже некуда.'),
    ],
  ),
  category(
    'dobryak-goda',
    'Добряк года',
    'people',
    'Тот, кто согрел ITD без повода. Помощь, поддержка и добро, которое не просит лайков.',
    [
      nominee('masha-plus', 'Маша «плюс один»', '@plus_one', 'Всегда добавит тебя в список, даже если список закрыт.'),
      nominee('kostya-lantern', 'Костя Фонарь', '@kostya_lantern', 'Подсвечивает путь без лишних слов.'),
      nominee('anya-tea', 'Аня «чай»', '@anya_tea', 'Заливает чай и вытаскивает из плохого дня.'),
      nominee('dr-hug', 'Dr. Hug', '@dr_hug', 'Официально не врач, но лечит лучше многих.'),
    ],
  ),
  category(
    'interactive-goda',
    'Интерактив года',
    'community',
    'Лучший совместный движ сообщества. Один голос за проект, который затянул сильнее всех.',
    [
      nominee('quiet-chat', '«Тихий чат»', '@quietchat', 'Место, где можно молчать вместе.'),
      nominee('itd-hq', '«Штаб ITD»', '@itdhq', 'Координация, которая выглядела как магия.'),
      nominee('mem-factory', '«Мем-фабрика»', '@memfactory', 'Производство смеха без выходных.'),
      nominee('photo-hunt', '«Фотоохота»', '@photohunt', 'Заставил всех смотреть по сторонам.'),
      nominee('voting-club', '«Голосовалка»', '@votingclub', 'Спортивный интерес в чистом виде.'),
    ],
  ),
  category(
    'interview-goda',
    'Интервью года',
    'community',
    'Разговор, после которого захотелось думать. Один голос за интервью, которое осталось с вами.',
    [
      nominee('after-midnight', '«После полуночи»', '@aftermidnight', 'Разговоры, которые не помещаются в таймкод.'),
      nominee('hard-questions', '«Неудобные вопросы»', '@hardquestions', 'Спрашивает то, что другие постеснялись.'),
      nominee('eye-to-eye', '«С глазу на глаз»', '@eye2eye', 'Тихо, честно и без подготовки.'),
      nominee('honestly', '«Честно говоря»', '@honestly', 'Интервью, после которых меняют мнение.'),
      nominee('room-404', '«Комната 404»', '@room404', 'Там, где находят друг друга.'),
    ],
  ),
  category(
    'photographer-goda',
    'Фотограф года',
    'people',
    'Кадр, который стал воспоминанием. Свет, момент и взгляд, который сложно повторить.',
    [
      nominee('liza-svet', 'Лиза Свет', '@lizasvet', 'Ловит свет там, где остальные видят тень.'),
      nominee('frame-seven', 'Кадр №7', '@frame7', 'Седьмой кадр всегда оказывается главным.'),
      nominee('misha-shadow', 'Миша Тень', '@mishaten', 'Тёмные кадры с очень светлым смыслом.'),
      nominee('glow-exe', 'Glow.exe', '@glowexe', 'Пересвет как художественный приём.'),
    ],
  ),
  category(
    'shitposter-goda',
    'Щитпостер года',
    'content',
    'Смеёмся, но любим. Голос за того, чей абсурд держал сообщество на плаву весь год.',
    [
      nominee('shitpost-daily', 'shitpost.daily', '@shitpostdaily', 'Поставляет абсурд в промышленных масштабах.'),
      nominee('mem-ded', '«Мемный дед»', '@memded', 'Видел все мемы до того, как они стали мемами.'),
      nominee('tired-public', '«Паблик, который устал»', '@tiredpublic', 'Устал, но продолжает.'),
      nominee('toxic-positive', '«Токсичный позитив»', '@toxicpositive', 'Улыбается так, что становится не по себе.'),
    ],
  ),
]

export function getCategory(categoryId: string | undefined): Category | undefined {
  return categories.find((categoryItem) => categoryItem.id === categoryId)
}

export function getNominee(categoryItem: Category, nomineeId: string): Nominee | undefined {
  return categoryItem.nominees.find((nomineeItem) => nomineeItem.id === nomineeId)
}


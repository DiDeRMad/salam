export const siteConfig = {
  name: "Салам Крестьянский",
  shortName: "Крестьянский",
  description: "Ресторан восточной и европейской кухни в Бийске. Бронирование столов, меню, атмосфера комфорта.",
  contact: {
    phone: "+7-962-792-13-33",
    mainAddress: "г. Бийск, ул. Центральная, 15",
    addresses: [
      {
        name: "ЦУМ",
        address: "Ул. Владимира Ленина, 250/1 (1 этаж)",
        district: "Центр м-н, Бийск"
      },
      {
        name: "ТЦ Приобье",
        address: "Ул. Васильева, 26 (1 этаж)",
        district: "Выставочный зал м-н, Бийск"
      }
    ]
  },
  hours: {
    weekdaysTitle: "Понедельник - Четверг",
    weekdays: "11:00 - 22:00",
    weekendsTitle: "Пятница - Воскресенье",
    weekends: "11:00 - 23:00",
    footerWeekdays: "Пн-Чт: 11:00 - 22:00",
    footerWeekends: "Пт-Вс: 11:00 - 23:00"
  },
  nav: [
    { href: "/", label: "Главная" },
    { href: "/menu", label: "Меню" },
    { href: "/booking", label: "Бронирование" }
  ],
  home: {
    tagline: "Восточная и европейская кухня",
    titlePart1: "Салам",
    titlePart2: "Крестьянский",
    subtitle: "Кухня в лучшем виде",
    description: "Блюда в лучших традициях восточной и европейской кухни. Мы готовим для вас с любовью, сохраняя истинный вкус и качество каждого ингредиента.",
    imgAlt: "Традиционные блюда",
    buttons: {
      menu: "Смотреть меню",
      booking: "Забронировать стол",
      bookingNow: "Перейти к бронированию"
    },
    stats: [
      { value: "5+", label: "Лет работы" },
      { value: "50+", label: "Блюд в меню" },
      { value: "1000+", label: "Довольных гостей" },
      { value: "4.8", label: "Рейтинг" }
    ],
    features: {
      title: "Почему выбирают",
      titleHighlight: "нас",
      subtitle: "Мы создаем не просто еду, а настоящий праздник вкуса",
      items: [
        { title: "Свежие продукты", description: "Только свежее мясо и овощи от местных фермеров. Никаких полуфабрикатов." },
        { title: "Семейная атмосфера", description: "Уютный зал для семейных обедов и встреч с друзьями в теплой обстановке." },
        { title: "Традиционные рецепты", description: "Готовим по старинным рецептам, которые передаются из поколения в поколение." }
      ]
    },
    popular: {
      title: "Популярные блюда",
      subtitle: "Попробуйте наши фирменные блюда восточной и европейской кухни, которые стали настоящими хитами среди наших гостей.",
      viewAll: "Посмотреть все меню"
    },
    booking: {
      title: "Забронируйте столик",
      titleHighlight: "сейчас",
      subtitle: "Выберите удобный стол на интерактивной схеме зала"
    },
    reviews: {
      tagline: "Живые отзывы",
      title: "Что говорят",
      titleHighlight: "наши гости",
      subtitle: "Средняя оценка 4.9/5 на основе более 1500 отзывов. Спасибо, что выбираете нас для важных моментов!"
    },
    info: {
      hoursTitle: "Часы работы",
      contactTitle: "Контакты",
      addressLabel: "Адрес",
      phoneLabel: "Телефон"
    }
  },
  menu: {
    tagline: "Наше меню",
    title: "Блюда",
    titleHighlight: "восточной и европейской",
    titleSuffix: "кухни",
    subtitle: "Откройте для себя богатство вкусов Центральной Азии",
    emptyCategory: "В этой категории пока нет блюд",
    tipPrefix: "Совет:",
    tipText: "Попробуйте наш фирменный бешбармак — визитная карточка заведения",
    currency: "₽",
    nutrition: "Пищевая ценность (на 100г)",
    ingredients: "Состав",
    cal: "Ккал",
    prot: "Белки",
    fat: "Жиры",
    carb: "Углеводы"
  },
  bookingPage: {
    tagline: "Бронирование",
    title: "Выберите",
    titleHighlight: "столик",
    subtitle: "Выберите дату и время, затем нажмите на свободный стол",
    dateLabel: "Дата посещения",
    timeLabel: "Время",
    dateAndTime: "Дата и время",
    legends: "Обозначения",
    tableSizes: "Размер стола = количество мест",
    selectDateWarning: "Сначала выберите дату в панели слева",
    clickTableMsg: "Нажмите на свободный стол для бронирования",
    schemaMsg: "Схема зала ресторана",
    availableTablesLabel: "Свободно столов:",
    statusFree: "Свободен",
    statusOccupied: "Занят",
    statusSelected: "Выбран",
    statusUnavailable: "Недоступно",
    barText: "БАР",
    entranceText: "ВХОД",
    modal: {
      tableTitle: "Стол №",
      seatsValue: "мест",
      formNameLabel: "Ваше имя",
      formNamePlaceholder: "Иван Иванов",
      formPhoneLabel: "Телефон",
      formPhonePlaceholder: "+7 (XXX) XXX-XX-XX",
      submitButton: "Забронировать",
      submittingText: "Отправка..."
    },
    validation: {
      name: "Введите имя",
      phoneEmpty: "Введите телефон",
      phoneFormat: "Неверный формат телефона",
      date: "Выберите дату",
      time: "Выберите время",
      submitError: "Ошибка при бронировании",
      connError: "Ошибка соединения. Попробуйте ещё раз."
    },
    success: {
      title: "Заявка принята!",
      desc: "Мы свяжемся с вами для подтверждения"
    },
    dateWarningPop: "Сначала выберите дату посещения"
  },
  footer: {
    copyright: "© 2025 Салам Крестьянский. Все права защищены.",
    developedBy: "Разработано в рамках дипломного проекта",
    navHeader: "Навигация",
    contactHeader: "Контакты",
    hoursHeader: "Часы работы"
  }
}

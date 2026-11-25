/* =========================================================
   Арт-кафе «Пушкин» — Варениковская
   Меню, корзина, оформление заказа, бронирование
   ========================================================= */
(function () {
  'use strict';

  var PHONE = '+7 (918) 186-67-87';
  var PHONE_HREF = 'tel:+79181866787';
  var TG = 'https://t.me/artcafepushkin';
  var DELIVERY_FREE_FROM = 1500;
  var DELIVERY_PRICE = 150;
  var STORE_KEY = 'pushkin-cart-v1';

  /* ---------- меню ---------- */
  var MENU = {
    pizza: [
      { id: 'p1', name: 'Маргарита', price: 490, tag: 'хит', desc: 'Тонкое тесто, томатный соус, моцарелла, базилик, оливковое масло.' },
      { id: 'p2', name: 'Пепперони', price: 590, tag: '', desc: 'Пикантная пепперони, моцарелла, томатный соус, орегано.' },
      { id: 'p3', name: 'Морская', price: 690, tag: '', desc: 'Креветки, кальмар, мидии, сыр, соус на основе сливок.' },
      { id: 'p4', name: 'Гавайская', price: 560, tag: '', desc: 'Курица, ананас, моцарелла, сливочно-томатный соус.' },
      { id: 'p5', name: 'Бекон с грибами', price: 620, tag: '', desc: 'Бекон, шампиньоны, моцарелла, томатный соус.' },
      { id: 'p6', name: 'Четыре сыра', price: 640, tag: '', desc: 'Моцарелла, дор-блю, чеддер, пармезан, сливочный соус.' }
    ],
    rolls: [
      { id: 'r1', name: 'Филадельфия', price: 590, tag: 'хит', desc: 'Лосось, сливочный сыр, огурец, рис, нори.' },
      { id: 'r2', name: 'Калифорния с крабом', price: 520, tag: '', desc: 'Краб, авокадо, огурец, икра тобико, рис.' },
      { id: 'r3', name: 'Запечённый с лососем', price: 480, tag: '', desc: 'Лосось, сыр, соус спайси, кунжут.' },
      { id: 'r4', name: 'Дракон', price: 620, tag: '', desc: 'Угорь, авокадо, огурец, соус унаги, кунжут.' },
      { id: 'r5', name: 'Сет «Пушкин»', price: 1690, tag: 'сет', desc: '32 кусочка: Филадельфия, Калифорния, запечённые роллы.' }
    ],
    burgers: [
      { id: 'b1', name: 'Классический бургер', price: 390, tag: 'в перчатках', desc: 'Котлета из говядины, сыр чеддер, салат, томат, соус. Подаём с перчатками.' },
      { id: 'b2', name: 'Чизбургер двойной', price: 490, tag: '', desc: 'Две котлеты, двойной чеддер, бекон, соус барбекю.' },
      { id: 'b3', name: 'Чикен бургер', price: 360, tag: '', desc: 'Куриное филе в хрустящей панировке, салат, соус.' },
      { id: 'b4', name: 'Картофель фри', price: 190, tag: '', desc: 'Подаём в неостывающем ведёрке, с соусом на выбор.' }
    ],
    salads: [
      { id: 's1', name: 'Цезарь с курицей', price: 420, tag: '', desc: 'Курица гриль, романо, пармезан, гренки, соус цезарь.' },
      { id: 's2', name: 'Салат из баклажан', price: 390, tag: '', desc: 'Баклажаны, томаты, зелень, чесночный соус.' },
      { id: 's3', name: 'Греческий', price: 380, tag: '', desc: 'Фета, огурцы, томаты, оливки, красный лук, орегано.' },
      { id: 's4', name: 'Сырные палочки', price: 320, tag: '', desc: 'Моцарелла в панировке, соус маринара.' }
    ],
    hot: [
      { id: 'h1', name: 'Стейк из свинины', price: 690, tag: '', desc: 'Свиная шея на гриле, овощи, соус на выбор.' },
      { id: 'h2', name: 'Куриное филе на гриле', price: 540, tag: '', desc: 'Филе, картофель по-деревенски, соус.' },
      { id: 'h3', name: 'Паста карбонара', price: 520, tag: '', desc: 'Спагетти, бекон, сливочный соус, пармезан.' },
      { id: 'h4', name: 'Детское блюдо «Мышка»', price: 340, tag: 'для детей', desc: 'Оформляем в виде мышки — дети в восторге.' }
    ],
    desserts: [
      { id: 'd1', name: 'Тирамису', price: 320, tag: 'хит', desc: 'Классический, с маскарпоне и эспрессо. Со свечой — для юбиляра.' },
      { id: 'd2', name: 'Чизкейк', price: 300, tag: '', desc: 'Нежный сливочный чизкейк на песочной основе.' },
      { id: 'd3', name: 'Медовик', price: 280, tag: '', desc: 'Домашний, с тонкими коржами и сметанным кремом.' },
      { id: 'd4', name: 'Мороженое', price: 190, tag: '', desc: 'Три шарика, топпинг на выбор.' }
    ],
    drinks: [
      { id: 'k1', name: 'Облепиховый чай', price: 320, tag: 'легенда', desc: 'Чайник на свечке, апельсин, мёд. Тот самый, за который возвращаются.' },
      { id: 'k2', name: 'Капучино', price: 190, tag: '', desc: 'С рисунком на молоке. Есть кофе с собой.' },
      { id: 'k3', name: 'Латте', price: 210, tag: '', desc: 'Мягкий, на выбор: классический, ванильный, карамельный.' },
      { id: 'k4', name: 'Коктейли бармена', price: 390, tag: '', desc: 'Авторские безалкогольные коктейли — спросите бармена.' },
      { id: 'k5', name: 'Домашний лимонад', price: 240, tag: '', desc: 'Сезонные ягоды, мята, лёд.' }
    ]
  };

  /* ---------- отзывы (реальные, с Яндекс.Карт) ---------- */
  var REVIEWS = [
    {
      name: 'Светлана Мстиславская', meta: 'Знаток города 3 уровня · 22 августа 2025', stars: 5,
      text: 'Мы семьёй 13 августа посетили арт-кафе «Пушкин», с целью проведения юбилея! Очень атмосферное заведение, обслуживание на высшем уровне, а также вежливый персонал! Особенно хочется отметить вкусное и оригинальное меню и очень порадовало оформление детского блюда в виде мышки! Ребёнок был в восторге! Юбилярше в конце вечера вынесли сладкий презент в виде тирамису со свечой! Хочется выразить благодарность всему коллективу, особенно официанту Ирине!'
    },
    {
      name: 'Ярослав', meta: 'Дегустатор 3 уровня · 16 мая', stars: 5,
      text: 'Кафе «Пушкин» в Варениковской работает уже продолжительное время, но до сих пор держит высокую марку. Именно ради соотношения «цена-качество» его можно посетить. Салаты и горячие блюда по вкусу и подаче не уступают ресторанным. Все позиции были в наличии, размер порции отличный, вкус на твёрдую пятёрку. Роллы готовят с душой, не разваливаются после погружения в соевый соус. Персонал вежливый, внимательный.'
    },
    {
      name: 'Anuta Kulinich', meta: 'Дегустатор 3 уровня · 7 января 2025', stars: 5,
      text: 'Были проездом, хотели поесть вкусной и нормальной еды после огромного количества бутербродов в дороге. Выбрали место по оценке в Яндекс.Картах и не пожалели. Очень симпатично, вкусно, достаточно быстро готовят, адекватные цены. Спасибо!'
    },
    {
      name: 'Римма Латыпова', meta: 'Знаток города 4 уровня · 2 августа 2025', stars: 5,
      text: 'Очень приятно отдохнули. Всё очень понравилось, вкусно и красиво. Подача на 5+. Девочки очень вежливые и приятные. Обед удался! Обязательно ещё придём, спасибо большое. Удачи вам и процветания!'
    },
    {
      name: 'Валентина Короткова', meta: 'Дегустатор 6 уровня · 16 октября', stars: 5,
      text: 'Были проездом, нам всё понравилось. Разрешили в заведении даже с собачками посидеть. Еда вкусная, цены нормальные, чисто и уютно, персонал классный.'
    },
    {
      name: 'Сергей Илларионович', meta: 'Знаток города 6 уровня · 20 апреля 2023', stars: 5,
      text: 'Мне прям понравилось, даже очень. Картошка фри в неостывающих ведёрках, может её не так много, но подача здоровская. Ещё облепиховый чай — вот это бомба, ребятки. Попробуйте, не пожалеете. Чайник подогревался на свечке, в нём плавали кружочки апельсина.'
    },
    {
      name: 'Влад', meta: 'Знаток города 4 уровня · 12 декабря 2024', stars: 5,
      text: 'Там вкусно! Мы с семьёй туда поехали и заказали бургеры и роллы. Нам с бургерами принесли перчаточки — так удобно! Руки не пачкаются, да и так реально удобнее!'
    },
    {
      name: 'Ольга', meta: 'Знаток города 3 уровня · 28 октября 2023', stars: 5,
      text: 'Интерьер уютный и стильный, создаёт идеальную атмосферу для романтического ужина или встречи с друзьями. Порадовало разнообразие меню, все блюда очень вкусные. Превосходная пицца!'
    },
    {
      name: 'Валентина Трапезникова', meta: 'Знаток города 6 уровня · 4 сентября 2024', stars: 5,
      text: 'Потрясающее кафе, оформление классное, вкусная еда. Очень вкусные коктейли. Отдельная благодарность бармену за потрясающие коктейли — девушка подсказывала, советовала и готовила обалденные вещи. Мы с мужем кайфанули от вас!'
    }
  ];

  /* ---------- утилиты ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function money(n) { return n.toLocaleString('ru-RU') + ' ₽'; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function initials(name) { return (name.trim()[0] || 'П').toUpperCase(); }

  var ALL_DISHES = Object.keys(MENU).reduce(function (acc, cat) {
    MENU[cat].forEach(function (d) { acc[d.id] = d; });
    return acc;
  }, {});

  /* ---------- корзина ---------- */
  var cart = loadCart();

  function loadCart() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      var data = raw ? JSON.parse(raw) : {};
      var clean = {};
      Object.keys(data).forEach(function (id) {
        if (ALL_DISHES[id] && data[id] > 0) clean[id] = Math.min(99, data[id] | 0);
      });
      return clean;
    } catch (e) { return {}; }
  }
  function saveCart() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); } catch (e) {}
  }
  function cartCount() {
    return Object.keys(cart).reduce(function (n, id) { return n + cart[id]; }, 0);
  }
  function cartSubtotal() {
    return Object.keys(cart).reduce(function (sum, id) { return sum + ALL_DISHES[id].price * cart[id]; }, 0);
  }
  function deliveryFee(subtotal, isDelivery) {
    if (!isDelivery) return 0;
    return subtotal >= DELIVERY_FREE_FROM ? 0 : DELIVERY_PRICE;
  }


  /* ---------- отрисовка меню ---------- */
  var menuGrid = $('#menuGrid');
  var activeCat = 'pizza';

  function renderMenu(cat) {
    if (!menuGrid) return;
    activeCat = cat;
    var items = MENU[cat] || [];
    menuGrid.innerHTML = items.map(function (d, i) {
      return '<article class="dish" style="animation-delay:' + (i * 45) + 'ms">' +
        '<div class="dish__top">' +
          '<h3 class="dish__name">' + esc(d.name) + '</h3>' +
          (d.tag ? '<span class="dish__tag">' + esc(d.tag) + '</span>' : '') +
        '</div>' +
        '<p class="dish__desc">' + esc(d.desc) + '</p>' +
        '<div class="dish__bottom">' +
          '<span class="dish__price">' + money(d.price) + '</span>' +
          '<button class="dish__add" type="button" data-add="' + d.id + '" aria-label="Добавить ' + esc(d.name) + ' в корзину">+</button>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  if (menuGrid) {
    $$('.menu-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        $$('.menu-tab').forEach(function (t) {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        renderMenu(tab.dataset.cat);
      });
    });

    menuGrid.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-add]');
      if (!btn) return;
      addToCart(btn.dataset.add);
    });
  }

  /* ---------- отрисовка отзывов ---------- */
  var reviewsGrid = $('#reviewsGrid');
  if (reviewsGrid) {
    reviewsGrid.innerHTML = REVIEWS.map(function (r) {
      var stars = '';
      for (var i = 0; i < 5; i++) stars += i < r.stars ? '★' : '☆';
      return '<article class="review">' +
        '<div class="review__head">' +
          '<span class="review__avatar" aria-hidden="true">' + esc(initials(r.name)) + '</span>' +
          '<span class="review__who">' +
            '<span class="review__name">' + esc(r.name) + '</span>' +
            '<span class="review__meta">' + esc(r.meta) + '</span>' +
          '</span>' +
          '<span class="review__stars" aria-label="Оценка ' + r.stars + ' из 5">' + stars + '</span>' +
        '</div>' +
        '<p class="review__text">' + esc(r.text) + '</p>' +
      '</article>';
    }).join('');
  }

  /* ---------- корзина: добавление/изменение ---------- */
  function addToCart(id) {
    if (!ALL_DISHES[id]) return;
    cart[id] = Math.min(99, (cart[id] || 0) + 1);
    saveCart();
    syncCartUI();
    bumpBadge();
    toast('«' + ALL_DISHES[id].name + '» в корзине', { label: 'Открыть', onClick: openCart });
  }
  function changeQty(id, delta) {
    if (!cart[id]) return;
    cart[id] += delta;
    if (cart[id] <= 0) delete cart[id];
    saveCart();
    syncCartUI();
  }

  var clearedCart = null;
  function clearCart() {
    if (!cartCount()) return;
    clearedCart = JSON.parse(JSON.stringify(cart));
    cart = {};
    saveCart();
    syncCartUI();
    toast('Корзина очищена', { label: 'Вернуть', onClick: restoreCart });
  }
  function restoreCart() {
    if (!clearedCart) return;
    cart = clearedCart;
    clearedCart = null;
    saveCart();
    syncCartUI();
    toast('Заказ вернулся в корзину');
  }

  var cartBody = $('#cartBody');
  var cartFoot = $('#cartFoot');
  var cartBadge = $('#cartBadge');
  var cartClearBtn = $('#cartClear');

  function bumpBadge() {
    if (!cartBadge) return;
    cartBadge.classList.remove('is-bumped');
    void cartBadge.offsetWidth;
    cartBadge.classList.add('is-bumped');
  }

  function syncCartUI() {
    var count = cartCount();
    if (cartBadge) {
      cartBadge.textContent = count;
      cartBadge.hidden = count === 0;
    }
    if (cartClearBtn) cartClearBtn.hidden = count === 0;

    if (cartBody) {
      var ids = Object.keys(cart);
      if (!ids.length) {
        cartBody.innerHTML =
          '<div class="drawer__empty">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h-2l-.7 2H2v2h2.4l2.5 9.2c.1.5.6.8 1.1.8h8.9c.5 0 .9-.3 1.1-.8L21 7H6.6L6.2 5.5C6 4.7 5.5 4 4.6 4H7z"/></svg>' +
            '<p>Пока пусто. Загляните в меню — начните с пиццы или облепихового чая.</p>' +
            '<button class="btn btn--outline" type="button" data-close-cart>Перейти к меню</button>' +
          '</div>';
        if (cartFoot) cartFoot.hidden = true;
        return;
      }

      cartBody.innerHTML = ids.map(function (id) {
        var d = ALL_DISHES[id];
        return '<div class="cart-item">' +
          '<div class="cart-item__body">' +
            '<div class="cart-item__name">' + esc(d.name) + '</div>' +
            '<div class="cart-item__price">' + money(d.price) + ' × ' + cart[id] + '</div>' +
          '</div>' +
          '<div class="qty">' +
            '<button type="button" data-qty="-1" data-id="' + id + '" aria-label="Убрать одну порцию">−</button>' +
            '<span>' + cart[id] + '</span>' +
            '<button type="button" data-qty="1" data-id="' + id + '" aria-label="Добавить одну порцию">+</button>' +
          '</div>' +
          '<div class="cart-item__sum">' + money(d.price * cart[id]) + '</div>' +
        '</div>';
      }).join('');

      if (cartFoot) {
        cartFoot.hidden = false;
        var sub = cartSubtotal();
        var fee = deliveryFee(sub, false);
        $('#cartSubtotal').textContent = money(sub);
        $('#cartDelivery').textContent = sub >= DELIVERY_FREE_FROM
          ? 'бесплатно от ' + money(DELIVERY_FREE_FROM)
          : 'от ' + money(DELIVERY_PRICE);
        $('#cartTotal').textContent = money(sub + fee);
      }
    }
  }

  if (cartBody) {
    cartBody.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-qty]');
      if (!btn) return;
      changeQty(btn.dataset.id, parseInt(btn.dataset.qty, 10));
    });
  }

  if (cartClearBtn) {
    cartClearBtn.addEventListener('click', clearCart);
  }


  /* ---------- панели ---------- */
  var cartDrawer = $('#cartDrawer');
  var checkoutModal = $('#checkoutModal');
  var bookingModal = $('#bookingModal');

  function openPanel(el) {
    if (!el) return;
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closePanel(el) {
    if (!el) return;
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    if (!$$('.is-open', document).length) document.body.style.overflow = '';
  }

  var cartOpenBtn = $('#cartOpen');
  function openCart() {
    syncCartUI();
    openPanel(cartDrawer);
  }
  if (cartOpenBtn) cartOpenBtn.addEventListener('click', openCart);

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-close-cart]')) closePanel(cartDrawer);
    if (e.target.closest('[data-close-modal]')) {
      closePanel(checkoutModal);
      closePanel(bookingModal);
    }
    if (e.target.closest('[data-open-booking]')) {
      e.preventDefault();
      openPanel(bookingModal);
      var d = $('#bookingForm [name="date"]');
      if (d && !d.value) d.value = new Date().toISOString().slice(0, 10);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closePanel(cartDrawer);
      closePanel(checkoutModal);
      closePanel(bookingModal);
      var navEl = $('#nav');
      if (navEl) navEl.classList.remove('is-open');
      var burgerEl = $('#burger');
      if (burgerEl) burgerEl.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- оформление заказа ---------- */
  function buildOrderText(isDelivery) {
    var ids = Object.keys(cart);
    var sub = cartSubtotal();
    var fee = deliveryFee(sub, isDelivery);
    var lines = ['Заказ в арт-кафе «Пушкин»', ''];
    ids.forEach(function (id) {
      var d = ALL_DISHES[id];
      lines.push('• ' + d.name + ' — ' + cart[id] + ' шт. × ' + money(d.price) + ' = ' + money(d.price * cart[id]));
    });
    lines.push('');
    lines.push('Блюда: ' + money(sub));
    if (isDelivery) lines.push('Доставка: ' + (fee ? money(fee) : 'бесплатно'));
    lines.push('Итого: ' + money(sub + fee));
    lines.push('');
    lines.push('Адрес: Красная ул., 53, станица Варениковская');
    lines.push('Телефон кафе: ' + PHONE);
    return lines.join('\n');
  }

  var checkoutBtn = $('#checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
      if (!cartCount()) { toast('Сначала добавьте блюда'); return; }
      var text = buildOrderText(false);
      $('#orderText').textContent = text;
      $('#sendTelegram').href = TG;
      closePanel(cartDrawer);
      openPanel(checkoutModal);
    });
  }

  var copyOrderBtn = $('#copyOrder');
  if (copyOrderBtn) {
    copyOrderBtn.addEventListener('click', function () {
      var text = $('#orderText').textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { toast('Заказ скопирован'); },
          function () { toast('Не удалось скопировать'); });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); toast('Заказ скопирован'); } catch (err) { toast('Не удалось скопировать'); }
        document.body.removeChild(ta);
      }
    });
  }


  /* ---------- бронирование ---------- */
  var bookingForm = $('#bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = bookingForm.elements;
      var msg = [
        'Заявка на бронь — арт-кафе «Пушкин»',
        '',
        'Имя: ' + (f.name.value || '—'),
        'Телефон: ' + (f.phone.value || '—'),
        'Дата: ' + (f.date.value || '—'),
        'Время: ' + (f.time.value || '—'),
        'Гостей: ' + f.guests.value,
        'Повод: ' + f.reason.value,
        'Пожелания: ' + (f.comment.value || '—')
      ].join('\n');

      copySilently(msg);
      toast('Заявка готова — откройте Telegram или позвоните');
      window.open(TG, '_blank', 'noopener');
      closePanel(bookingModal);
      bookingForm.reset();
      var d = $('#bookingForm [name="date"]');
      if (d) d.value = new Date().toISOString().slice(0, 10);
    });
  }

  function copySilently(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text);
    } catch (e) {}
  }

  /* ---------- статус «открыто/закрыто» ---------- */
  function updateOpenStatus() {
    var el = $('#openStatus');
    if (!el) return;
    var now = new Date();
    var day = now.getDay(); // 0 = вс
    var weekend = day === 0 || day === 5 || day === 6;
    var closeHour = weekend ? 23 : 22;
    var mins = now.getHours() * 60 + now.getMinutes();
    var isOpen = mins >= 10 * 60 && mins < closeHour * 60;
    el.textContent = isOpen ? 'Открыто до ' + closeHour + ':00' : 'Закрыто · откроемся в 10:00';
    el.classList.toggle('is-closed', !isOpen);
  }

  /* ---------- шапка, мобильное меню ---------- */
  var header = $('#header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var burger = $('#burger');
  var nav = $('#nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', nav).forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- появление блоков ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- тост ---------- */
  var toastEl;
  var toastTimer;
  var toastAction = null;
  function toast(msg, action) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      toastEl.innerHTML = '<span class="toast__text"></span>';
      document.body.appendChild(toastEl);
    }
    $('.toast__text', toastEl).textContent = msg;

    if (toastAction) {
      toastEl.removeChild(toastAction);
      toastAction = null;
    }
    if (action && action.label) {
      toastAction = document.createElement('button');
      toastAction.type = 'button';
      toastAction.className = 'toast__action';
      toastAction.textContent = action.label;
      toastAction.addEventListener('click', function () {
        hideToast();
        action.onClick();
      });
      toastEl.appendChild(toastAction);
    }

    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, action && action.label ? 5200 : 2400);
  }
  function hideToast() {
    if (toastEl) toastEl.classList.remove('is-visible');
  }

  /* ---------- инициализация ---------- */
  renderMenu(activeCat);
  syncCartUI();
  updateOpenStatus();
  setInterval(updateOpenStatus, 60000);

  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  void PHONE_HREF;
})();


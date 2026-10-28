/* UI-only translations. Unknown backend diagnostics remain in their original form. */
(function () {
    'use strict';
    var ru = {
        'checking': 'проверка', 'Checking…': 'Проверка…', "Reading the TV's state.": 'Чтение состояния телевизора.',
        'Enable protection': 'Включить защиту', 'Update protection': 'Обновить защиту', 'Disable protection': 'Отключить защиту',
        'Domain entries': 'Домены в списке', 'Domain sink': 'Блокировка доменов', 'DNS filter': 'DNS-фильтр', 'DNS IPv6 mode': 'Режим DNS IPv6', 'Voice services': 'Голосовые службы', 'Ad services': 'Рекламные службы',
        'Purge now': 'Очистить сейчас', 'Self-test': 'Самопроверка', 'Refresh': 'Обновить', 'Show log': 'Показать журнал', 'Hide log': 'Скрыть журнал', 'Protections': 'Защита', 'Log': 'Журнал', 'Log output': 'Вывод журнала',
        'active': 'активно', 'waiting': 'ожидание', 'other': 'другая', 'off': 'выкл.', 'pending': 'ожидает', 'unavailable': 'недоступно', 'not managed': 'не управляется', 'disabled': 'отключён', 'preserved': 'сохранён', 'stopped': 'остановлены', 'running': 'работают', 'no root': 'нет root', 'rooted': 'root доступен',
        'Needs root': 'Требуется root', 'Install and enable the Homebrew Channel, then reopen this app.': 'Установите и включите Homebrew Channel, затем откройте приложение снова.',
        'Not protected': 'Защита выключена', 'This TV can still send viewing, ad, and voice data.': 'Телевизор всё ещё может отправлять данные о просмотрах, рекламе и голосе.',
        'Changes pending': 'Есть изменения', 'Your settings changed. Select "Update protection" to apply them.': 'Настройки изменены. Выберите «Обновить защиту», чтобы применить их.',
        'DNS filter needs attention': 'Проверьте DNS-фильтр', 'The DNS filter is on but its handoff is not active. Check the log for the reason.': 'DNS-фильтр включён, но перенаправление не работает. Проверьте журнал.',
        'DNS filter active (IPv4 path)': 'DNS-фильтр активен (IPv4)', 'IPv6 lookups can bypass the filter; turn on "Disable IPv6 with DNS filter" to cover them.': 'Запросы IPv6 могут обходить фильтр. Для их блокировки включите «Отключить IPv6 с DNS-фильтром».',
        'SDP grace period': 'Ожидание блокировки SDP', 'Other domain blocks are active. SDP will be blocked after its 60-second grace period.': 'Другие домены блокируются. SDP будет заблокирован через 60 секунд.',
        'Protected': 'Защита включена', 'Targeted ad and voice services are stopped; enabled domain blocks are applied.': 'Указанные рекламные и голосовые службы остановлены; выбранные домены блокируются.',
        'Luna call failed': 'Ошибка вызова Luna', 'bad luna url': 'Неверный адрес Luna', 'No Luna bridge available (not running on webOS?)': 'Мост Luna недоступен. Приложение запущено вне webOS?', 'Could not resolve app folder path': 'Не удалось определить папку приложения', 'Purge ACR and voice residue': 'Очистка данных ACR и голоса', 'status: ': 'Состояние: ', 'stderr: ': 'Ошибка: '
    };
    var layers = [
        ['ACR / Alphonso', 'Блокирует отправку данных автоматического распознавания контента'],
        ['SmartAd и рекламная платформа', 'Блокирует доставку рекламы и отслеживание'],
        ['Коды пульта QuickSet', 'Дополнительно. Блокирует поиск кодов; может помешать настройке пульта'],
        ['Главный экран и рекомендации', 'Блокирует телеметрию рекомендаций'],
        ['LG Content Store', 'Дополнительно. Блокирует магазин LG и рекомендации; магазин не откроется'],
        ['Сеансы приложений Home', 'Дополнительно. Блокирует отправку данных об использовании; может нарушить превью, спорт и сведения о каналах'],
        ['Телеметрия и отчёты о сбоях', 'Блокирует отправку отчётов о сбоях и данных APM'],
        ['LG SDP и синхронизация времени', 'Блокирует SDP через 60 секунд после запуска; LG Content Store не будет работать'],
        ['Время через NTP', 'Дополнительно. Устанавливает время через pool.ntp.org; SDP блокируется сразу после запуска'],
        ['Локальный DNS-фильтр', 'Направляет DNS IPv4 ConnMan через локальный фильтр; IPv6 настраивается отдельно'],
        ['Отключить IPv6 с DNS-фильтром', 'Отключает IPv6 ConnMan только при включённом фильтре. Иначе DNS IPv6 может обходить фильтр.'],
        ['Голосовые службы', 'Останавливает микрофон LG, пробуждение голосом и голосовое приложение; кнопка голоса не работает'],
        ['Рекламные службы', 'Останавливает службы рекламы, ACR и телеметрии'],
        ['Обнаружение в LAN', 'Блокирует обнаружение в локальной сети; трансляция на ТВ может не работать'],
        ['ThinQ и связанные службы', 'Дополнительно. Останавливает службы ThinQ/Alexa/IoT; приложение LG ThinQ не работает'],
        ['Очистка при запуске', 'Удаляет данные ACR и голоса при запуске'],
        ['LG Channels', 'Дополнительно. Приложение LG Channels не будет работать'],
        ['Обновления прошивки', 'Дополнительно. Блокирует обновления и исправления; это также можно настроить в Homebrew Channel']
    ];
    var lang = 'en', saved = null, nodes = [];
    try { saved = window.localStorage.getItem('nospy-language'); } catch (e) {}
    if (saved === 'ru' || saved === 'en') lang = saved;
    else if (/^ru(?:[-_]|$)/i.test(navigator.language || navigator.userLanguage || '')) lang = 'ru';
    function t(s) { return lang === 'ru' && Object.prototype.hasOwnProperty.call(ru, s) ? ru[s] : s; }
    function init() {
        var selectors = '.readout dt, .tools button, .layers h2, .logview h2';
        var list = document.querySelectorAll(selectors), i, btn, title, detail;
        for (i = 0; i < list.length; i++) nodes.push({ node: list[i], en: list[i].textContent });
        list = document.querySelectorAll('.layer');
        for (i = 0; i < list.length; i++) {
            title = list[i].querySelector('b'); detail = list[i].querySelector('small');
            nodes.push({ node: title, en: title.textContent, ru: layers[i][0] });
            nodes.push({ node: detail, en: detail.textContent, ru: layers[i][1] });
        }
        btn = document.getElementById('btn-language');
        btn.addEventListener('click', function () {
            lang = lang === 'ru' ? 'en' : 'ru';
            try { window.localStorage.setItem('nospy-language', lang); } catch (e) {}
            render();
            document.dispatchEvent(new Event('nospy-language-change'));
        });
        render();
    }
    function render() {
        var i;
        document.documentElement.lang = lang;
        for (i = 0; i < nodes.length; i++) nodes[i].node.textContent = lang === 'ru' ? (nodes[i].ru || t(nodes[i].en)) : nodes[i].en;
        document.getElementById('btn-language').setAttribute('aria-label', lang === 'ru' ? 'Переключить язык на английский' : 'Switch language to Russian');
        document.getElementById('console').setAttribute('aria-label', t('Log output'));
    }
    window.nospyI18n = { t: t, init: init };
}());

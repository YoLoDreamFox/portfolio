import {templateProject,templateCard,templateExperience,templateContact} from './template.js';
import {projects,cards,experience,contacts} from '../data/data.js';
import {gettingLocalization} from './language.js';


const select_project = document.getElementById('select_projects');
select_project.addEventListener('change', (event) => {
    renderProjects(event.target.value);
});



async function renderProjects(id) {
    const found = projects.find(info => info.id === id);
    if (!found) return;
    const complete = templateProject(found.src,found.alt,found.name,found.description,found.stack.join(', '),found.urlWatch,found.urlCode);
    document.getElementById('main_projects').replaceChildren(complete);
    renderLanguage(localCurrentLanguage()); //TODO
}

async function renderCards() {

    const complete = document.createDocumentFragment();
    for (const group of cards) {
        complete.append(templateCard(group.name, group.item));
    }
    document.getElementById('main_skills').replaceChildren(complete);
}

function pluralizeRu(value,one,few,many) {
    const rule_ru = new Intl.PluralRules('ru-RU').select(value);
    switch (rule_ru) {
        case 'one':  return `${value} ${one}`; 
        case 'few':  return `${value} ${few}`; 
        case 'many': return `${value} ${many}`;
        default:     return `${value} ${many}`;
    }
}

function pluralizeEn(value,one,other) {
    const rule_en = new Intl.PluralRules('en-US').select(value);
    return rule_en === 'one' ? `${value} ${one}` : `${value} ${other}`;
}

function timeDifference(data_start,data_end) {
    const parts_ru = [];
    const parts_en = [];
    let data_difference_years = data_end.getFullYear() - data_start.getFullYear();
    let data_difference_months = data_end.getMonth() - data_start.getMonth();
    let data_difference_days = data_end.getDate() - data_start.getDate();
    if (data_difference_days < 0) {
        data_difference_months--;
        data_difference_days += (new Date(data_end.getFullYear(), data_end.getMonth(), 0)).getDate();
    }
    if (data_difference_months < 0) {
        data_difference_years--; 
        data_difference_months += 12;
    }

    if (data_difference_years !== 0) {
        parts_ru.push(pluralizeRu(data_difference_years, 'год', 'года', 'лет'));
        parts_en.push(pluralizeEn(data_difference_years, 'year', 'years'));
    };
    if (data_difference_months !== 0) {
        parts_ru.push(pluralizeRu(data_difference_months, 'месяц', 'месяца', 'месяцев'));
        parts_en.push(pluralizeEn(data_difference_months, 'month', 'months'));
    };
    if (data_difference_days !== 0) {
        parts_ru.push(pluralizeRu(data_difference_days, 'день', 'дня', 'дней'));
        parts_en.push(pluralizeEn(data_difference_days, 'day', 'days'));
    };

    let data_difference_ru = parts_ru.length > 0 ? parts_ru.join(', ') : '0 дней';
    let data_difference_en = parts_en.length > 0 ? parts_en.join(', ') : '0 days';
    return {data_difference_ru, data_difference_en};
}

async function renderExperience() {
    const complete = document.createDocumentFragment();
    const experience_sort = experience.toSorted((a,b) => {
        const time = new Date();
        const end_a = a.end != null ? new Date (a.end.year, a.end.month-1, a.end.day) : time;
        const end_b = b.end != null ? new Date (b.end.year, b.end.month-1, b.end.day) : time;

        const diff_end =  end_b.getTime() - end_a.getTime();

        const start_a = new Date (a.start.year, a.start.month-1, a.start.day);
        const start_b = new Date (b.start.year, b.start.month-1, b.start.day);

        const diff_start = start_b.getTime() - start_a.getTime();

        return diff_end || diff_start;
    });

    for (const group of experience_sort) {
        const data_start = new Date(group.start.year, group.start.month-1, group.start.day);
        let data_end = new Date();
        let end_time = {};
        if (group.end == null){
            const now = new Date();
            data_end = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Можно в одну строчку, но так красивее
            const end_time_ru = "текущий момент";
            const end_time_en = "the present";
            end_time = {end_time_ru, end_time_en};
        }else{
            data_end = new Date(group.end.year, group.end.month-1, group.end.day);
            const end_time_ru = data_end.toLocaleDateString('ru-RU',{day: 'numeric', month: 'long', year: 'numeric'});
            const end_time_en = data_end.toLocaleDateString('en-US',{day: 'numeric', month: 'long', year: 'numeric'});
            end_time = {end_time_ru, end_time_en};
        }

        const difference_time = timeDifference(data_start,data_end);
        
        
        const start_time_ru = data_start.toLocaleDateString('ru-RU',{day: 'numeric', month: 'long', year: 'numeric'});
        const start_time_en = data_start.toLocaleDateString('en-US',{day: 'numeric', month: 'long', year: 'numeric'});
        const start_time = {start_time_ru, start_time_en};


        complete.append(templateExperience(group.name,start_time,end_time,data_end,difference_time,group.description));
    }
    document.getElementById('main_exp').replaceChildren(complete);
}

async function renderContacts() {
    const complete = document.createDocumentFragment();
        for (const group of contacts) {
            complete.append(templateContact(group.icon, group.url, group.name));
        }
    document.getElementById('main_contacts').replaceChildren(complete);
}


function localCurrentLanguage() {
    let tryLocal = null;
    try {
        tryLocal = localStorage.getItem('language');
    } catch {
        tryLocal = null;
    };
    let currentLanguage = tryLocal ?? navigator.language.split('-')[0];
    const supportedLanguages = ['ru', 'en'];
    if (!supportedLanguages.includes(currentLanguage)) {
        currentLanguage = 'en';
    }
    return currentLanguage;
}


function switchLanguage() {
    renderLanguage (localCurrentLanguage());
    const switchRu = document.getElementById('switch-ru');
    const switchEn = document.getElementById('switch-en');
    switchRu.addEventListener('click', function() {
        renderLanguage("ru");
        try {localStorage.setItem('language', 'ru')} catch {};
    });
    switchEn.addEventListener('click', function() {
        renderLanguage("en");
        try {localStorage.setItem('language', 'en')} catch {};
    });
}




async function renderLanguage(currentLanguage) {
    document.documentElement.setAttribute('lang', currentLanguage);
    const allDatai18n = document.querySelectorAll('[data-i18n]');
    const translation = await gettingLocalization();
    if (translation !== null && translation !== undefined) {
        const languageData = translation[currentLanguage];
        for (const dataI18n of allDatai18n) {
            const info = dataI18n.dataset.i18n ?? "error_not_specified_key";
    
            if (dataI18n.hasAttribute('alt')) {
                dataI18n.setAttribute('alt', languageData[info] ?? languageData["error_nonexistent_key"]);
            } else {
                dataI18n.textContent = languageData[info] ?? languageData["error_nonexistent_key"];
            }
        }
    
        const allDataLang = document.querySelectorAll('[data-lang]');
        for (const dataLang of allDataLang) {
            const info = dataLang.dataset.lang;
            dataLang.classList.remove('invisible');
            if (info != currentLanguage) {
                dataLang.classList.add('invisible');
            }
        }

    } else {
    }
}

function languageButton() {
    const languageButton = document.getElementById('language_button');
    const dropdownMenu = document.querySelector('.dropdown_menu');
    document.addEventListener('click', (event) => {
        if (languageButton.contains(event.target)) {
            dropdownMenu.classList.toggle('invisible');
        } else if (!dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add('invisible');
        }
    });
    languageButton.parentElement.addEventListener('mouseover', () => {
        dropdownMenu.classList.remove('invisible');
    });
    languageButton.parentElement.addEventListener('mouseout', () => {
        dropdownMenu.classList.add('invisible');
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {localStorage.setItem('theme', theme)} catch {};
}

function themeButton() {
    const themeButton = document.querySelector('.theme');
    themeButton.addEventListener('click', (event) => {
        if (event.target.classList.contains('light')) {
            setTheme('light');
        } else if (event.target.classList.contains('dark')) {
            setTheme('dark');
        } else if (event.target.classList.contains('auto')) {
            document.documentElement.removeAttribute('data-theme');
            try {localStorage.removeItem('theme')} catch {};
        }
    });

}

function aboutButton() {
    const aboutButton = document.getElementById('button_more_info');
    const aboutDialog = document.getElementById('more_info');
    aboutDialog.addEventListener('click', (event) => {
        if (event.target === aboutDialog) {
            aboutDialog.close();
        }
    })
    aboutButton.addEventListener('click', () => {
        aboutDialog.showModal();
    })
}


function updateSpanPosition(event, button) {
    const span = button.querySelector('span');
    if (!span) return;
    const rect = button.getBoundingClientRect();
    span.style.left = `${event.clientX - rect.left}px`;
    span.style.top = `${event.clientY - rect.top}px`;
}

function animatedButton() {
    const handler = (event) => {
        const button = event.target.closest('.original');
        if (!button) return;                               
        if (button.contains(event.relatedTarget)) return;   
        updateSpanPosition(event, button);
    };
    document.addEventListener('mouseover', handler);
    document.addEventListener('mouseout', handler);
}


function forwadingButton() {
    const forwadingButtons = document.querySelector('.forward').querySelectorAll('button');
    for (const forwadingButton of forwadingButtons) {
        forwadingButton.addEventListener('click', () => {
            document.querySelector(forwadingButton.dataset.target).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

function scrollButtonCreate(allCards) {
    const scrollButtonRight = document.querySelector('.control_button.right');
    const scrollButtonLeft = document.querySelector('.control_button.left');
    let isScrolling = false;
    
    scrollButtonRight.addEventListener('click', () => {
        allCards.scrollBy({
            left: allCards.querySelector('.card').offsetWidth,
            behavior: 'smooth'
        })
    });

    scrollButtonLeft.addEventListener('click', () => {
        allCards.scrollBy({
            left: -allCards.querySelector('.card').offsetWidth,
            behavior: 'smooth'
        })
    });

    allCards.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                scrollButton(allCards);
                isScrolling = false;
            });
            isScrolling = true;
        };
    });

}

function scrollButton(allCards) {
    const scrollButtonRight = document.querySelector('.control_button.right');
    const scrollButtonLeft = document.querySelector('.control_button.left');
    if (allCards.clientWidth < allCards.scrollWidth) {
        scrollButtonRight.classList.remove('invisible');
        scrollButtonLeft.classList.remove('invisible');
    } else {
        scrollButtonRight.classList.add('invisible');
        scrollButtonLeft.classList.add('invisible');
    }
    if (allCards.scrollLeft <= 0) {
        scrollButtonLeft.classList.add('invisible');
    }
    if (Math.ceil(allCards.scrollLeft) >= allCards.scrollWidth - allCards.clientWidth){
        scrollButtonRight.classList.add('invisible');
    }
    
}

function scrollForAllCards() {
    const allCards = document.getElementById('main_skills');
    scrollButtonCreate(allCards);
    
    const resizeObserver = new ResizeObserver(() => {
            scrollButton(allCards);
    });
    resizeObserver.observe(allCards);
    for (const card of allCards.querySelectorAll('.card')){
        resizeObserver.observe(card);
    }
}


renderProjects(select_project.querySelector('input[type="radio"]:checked').value);
renderCards();
renderExperience();
renderContacts();
switchLanguage();
languageButton();


themeButton();
aboutButton();
animatedButton();
forwadingButton();

scrollForAllCards();
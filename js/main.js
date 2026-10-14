import {templateProject,templateCard,templateExperience,templateContact} from './template.js';
import {projects,cards,experience,contacts} from '../data/data_2.js';
import {gettingLocalization} from './language.js';


const select_project = document.getElementById('select_projects');
select_project.addEventListener('change', (event) => {
    renderProjects(event.target.value);
});



async function renderProjects(id) {
    const found = projects.find(info => info.id === id);
    if (!found) return;
    const complete = templateProject(found.src,found.alt,found.name,found.description,found.stack,found.urlWatch,found.urlCode);
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
            const end_time_ru = data_end.toLocaleDateString('ru-RU',{month: 'long', year: 'numeric'});
            const end_time_en = data_end.toLocaleDateString('en-US',{month: 'long', year: 'numeric'});
            end_time = {end_time_ru, end_time_en};
        }

        const difference_time = timeDifference(data_start,data_end);
        
        
        const start_time_ru = data_start.toLocaleDateString('ru-RU',{month: 'long', year: 'numeric'});
        const start_time_en = data_start.toLocaleDateString('en-US',{month: 'long', year: 'numeric'});
        const start_time = {start_time_ru, start_time_en};


        complete.append(templateExperience(group.name,start_time,end_time,difference_time,group.description));
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
    switchRu.addEventListener('click', function(event) {
        renderLanguage("ru");
        try {localStorage.setItem('language', 'ru')} catch {};
    });
    switchEn.addEventListener('click', function(event) {
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
            const info = dataI18n.dataset.i18n ?? "error";
    
            if (dataI18n.hasAttribute('alt')) {
                dataI18n.setAttribute('alt', languageData[info]);
            } else {
                dataI18n.textContent = languageData[info];
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



//TODO
function languageButton() {
    const languageButton = document.getElementById('language_button');
    languageButton.addEventListener('click', function(event) {
        const dropdownMenu = document.querySelector('.dropdown_menu');
        dropdownMenu.classList.toggle('invisible')
    });
}






renderProjects(select_project.querySelector('input[type="radio"]:checked').value);
renderCards();
renderExperience();
renderContacts();
switchLanguage();
languageButton();
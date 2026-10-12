import {templateProject} from './template.js';
import { projects } from '../data/data.js';
import {templateCard} from './template.js';
import { cards } from '../data/data.js';
import {templateExperience} from './template.js';
import { experience } from '../data/data.js';
import {templateContact} from './template.js';
import { contacts } from '../data/data.js';


const select_project = document.getElementById('select_projects');

async function renderProjects(id) {
    const found = projects.find(info => info.id === id);
    if (!found) return;
    const complete = templateProject(found.src,found.alt.ru,found.name.ru,found.description.ru,found.stack,found.urlWatch,found.urlCode);
    document.getElementById('main_projects').replaceChildren(complete);
}

select_project.addEventListener('change', (event) => {
    renderProjects(event.target.value);
});

renderProjects("landing-tea"); //TODO


async function renderCards() {

    const complete = document.createDocumentFragment();
    for (const group of cards) {
        complete.append(templateCard(group.name, group.item));
    }
    document.getElementById('main_skills').replaceChildren(complete);
}

renderCards();

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

renderExperience();


async function renderContacts() {
    const complete = document.createDocumentFragment();
        for (const group of contacts) {
            complete.append(templateContact(group.icon, group.url, group.name));
        }
    document.getElementById('main_contacts').replaceChildren(complete);
}

renderContacts();
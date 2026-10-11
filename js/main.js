import {templateProject} from './template.js';
import { projects } from '../data/data.js';
import {templateCard} from './template.js';
import { cards } from '../data/data.js';


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
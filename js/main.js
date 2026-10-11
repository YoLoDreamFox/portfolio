import {template_project} from './template.js';
import { projects } from '../data/data.js';


const select_project = document.getElementById('select_projects');

async function renderProject(id) {
    const found = projects.find(info => info.id === id);
    if (!found) return;
    const complete = template_project(found.src,found.alt.ru,found.name.ru,found.description.ru,found.stack,found.urlWatch,found.urlCode);
    document.getElementById('main_projects').replaceChildren(complete);
}

select_project.addEventListener('change', (event) => {
    renderProject(event.target.value);
});

renderProject("landing-tea"); //TODO
export function templateProject(src_picture_project,alt_picture_project,name_project,description_project,stack_project,url_watch,url_code){
    const hiden = !url_code ? 'hiden' : '' ; 
    const html = `
    <div class="picture">
        <img src="${src_picture_project}" alt="${alt_picture_project}"></img>
    </div>
    <h2 data-i18n="${name_project}"></h2>
    <div class="description">
        <p data-i18n="${description_project}"></p>
    </div>
    <div class="stack">
        <p data-i18n="project_stack"></p><p>${stack_project}</p>
    </div>
    <div class="buttons">
        <a href="${url_watch}" class="watch">
            <p data-i18n="project_site">watch</p> 
        </a>
        <a href="${url_code}" class="code ${hiden}">
            <p data-i18n="project_code">code</p>
        </a>
    </div>
    `;

    const placeholder = document.createElement('div');
    placeholder.innerHTML =html.trim();
    return placeholder;
}


function renderProgressBar(progress_bar_name,progress_bar_value) {
    const bar = document.createElement('div');
    bar.className = 'progress_bar';
    bar.innerHTML = `
        <p>${progress_bar_name}</p>
        <progress max="100" value="${progress_bar_value}"></progress>
    `;
    return bar;
}


function renderAllProgressBar(items) {
    let placeholder = document.createDocumentFragment();
    for (const item of items) {
        placeholder.append(renderProgressBar(item.name, item.level));
    }
    return placeholder;
}

export function templateCard(name_card,items){

    const placeholder = document.createElement('div');
    placeholder.className = 'card';
    placeholder.innerHTML = `
    <h2 data-i18n="${name_card}">name</h2>
    <div class="all">
        <label for="all_bars">
            <div class="info">
                <p data-i18n="card_level_1">2</p>
                <p data-i18n="card_level_2">3</p>
                <p data-i18n="card_level_3">4</p>
            </div>
        </label>
        <div class="all_bars" id="all_bars">
        </div>
        <button class="cool_button">
            <p data-i18n="card_button">button</p>
        </button>
    </div>
    `;

    placeholder.querySelector('.all_bars').append(renderAllProgressBar(items));
    return placeholder;
}

function descriptionUl(description) {
    let ul = document.createElement('ul');
    for (const paragraph of description) {
        const li = document.createElement('li');
        li.dataset.i18n = paragraph;
        ul.append(li);
    }
    return ul;
}


export function templateExperience(name_experience,start_time_experience,end_time_experience,data_difference_experience,description_experience){

    const {data_difference_ru : data_difference_experience_ru, data_difference_en : data_difference_experience_en} = data_difference_experience;
    const {start_time_ru : start_time_experience_ru, start_time_en : start_time_experience_en} = start_time_experience;
    const {end_time_ru : end_time_experience_ru, end_time_en : end_time_experience_en} = end_time_experience;

    const type_experience = description_experience[0].type;
    const info_ecperience = description_experience[0].info;
    const description_list_experience = description_experience[1];
    const stack_experience = description_experience[2];

    const placeholder = document.createElement('div');
    placeholder.className = 'work';
    placeholder.innerHTML = `
    <h2>${name_experience}</h2>
    <div class="time">
        <p class="ru">
            с <time datetime="">${start_time_experience_ru}</time>
            по <time datetime="">${end_time_experience_ru}</time>
        </p>
        <p class="en">
            from <time datetime="">${start_time_experience_en}</time>
            to <time datetime="">${end_time_experience_en}</time>
        </p>
    </div>
    <div class="time_diff"> 
        <p class="ru">${data_difference_experience_ru}</p>
        <p class="en">${data_difference_experience_en}</p>
    </div>
    <div class="description">
        <div class="info">
            <p data-i18n="${type_experience}">info</p>
            <p data-i18n="${info_ecperience}">info</p>
        </div>
        <div class="more_info">
        </div>
        <div class="stack">
            <p data-i18n="project_stack">info</p>
            <p>${stack_experience}</p>
        </div>
    </div>
    `;

    placeholder.querySelector('.more_info').append(descriptionUl(description_list_experience));

    return placeholder;
}

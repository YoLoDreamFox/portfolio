export function templateProject(src_picture_project,alt_picture_project,name_project,description_project,stack_project,url_watch,url_code){
    const hiden = !url_code ? 'invisible' : '' ; 
    const html = `
    <div class="picture">
        <img src="${src_picture_project}" alt="${alt_picture_project}"></img>
    </div>
    <div>
        <h2 data-i18n="${name_project}"></h2>
        <div class="description">
            <p data-i18n="project_description"></p><p data-i18n="${description_project}"></p>
        </div>
        <div class="stack">
            <p data-i18n="project_stack"></p><p>${stack_project}</p>
        </div>
        <div class="buttons">
            <a href="${url_watch}" class="watch">
                <p data-i18n="project_site"></p> 
            </a>
            <a href="${url_code}" class="code ${hiden}">
                <p data-i18n="project_code"></p>
            </a>
        </div>
    </div>
    `;

    const placeholder = document.createElement('div');
    placeholder.innerHTML =html.trim();
    return placeholder;
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function renderProgressBar(progress_bar_name,progress_bar_value) {
    let sparkles = document.createDocumentFragment();
    let i = 0
    while (i < 5) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.style.setProperty('--sparkle-x', getRandomInt(0,100) + "%");
        sparkle.style.setProperty('--sparkle-y', getRandomInt(0,100) + "%");
        sparkle.style.setProperty('--sparkle-delay',getRandomInt(1,1000) + "ms");
        sparkle.style.setProperty('--sparkle-duration', getRandomInt(5000,10000)+ "ms");
        sparkles.append(sparkle);
        i++;
    }
    const bar = document.createElement('div');
    bar.className = 'progress_bar';
    bar.innerHTML = `
        <p>${progress_bar_name}</p>
        <div class="meter">
            <span class="fill">
                <span class="glow"></span>
            </span>
        </div>
    `;
    bar.querySelector('.fill').style.setProperty('--progress-bar-level', `${progress_bar_value}%`);
    bar.querySelector('.glow').style.setProperty('--glow-delay',getRandomInt(1,1000)+ "ms")
    bar.querySelector('.fill').append(sparkles);
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
    <h2 data-i18n="${name_card}"></h2>
    <div class="all">
        <label for="all_bars">
            <div class="info">
                <p data-i18n="card_level_1"></p>
                <p data-i18n="card_level_2"></p>
                <p data-i18n="card_level_3"></p>
            </div>
        </label>
        <div class="all_bars" id="all_bars">
        </div>
    </div>
    <button class="cool_button">
        <p data-i18n="card_button"></p>
    </button>
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
    <div>
        <h2 data-i18n="${name_experience}"></h2>
        <div class="time">
            <p data-lang="ru">
                с <time datetime="">${start_time_experience_ru}</time>
                по <time datetime="">${end_time_experience_ru}</time>
            </p>
            <p data-lang="en">
                from <time datetime="">${start_time_experience_en}</time>
                to <time datetime="">${end_time_experience_en}</time>
            </p>
        </div>
        <div class="time_diff"> 
            <p data-lang="ru">${data_difference_experience_ru}</p>
            <p data-lang="en">${data_difference_experience_en}</p>
        </div>
    </div>
    <div class="description">
        <div class="info">
            <p data-i18n="${type_experience}"></p>
            <p data-i18n="${info_ecperience}"></p>
        </div>
        <div class="more_info">
        </div>
        <div class="stack">
            <p data-i18n="project_stack"></p>
            <p>${stack_experience}</p>
        </div>
    </div>
    `;
    placeholder.querySelector('.more_info').append(descriptionUl(description_list_experience));
    return placeholder;
}



export function templateContact(icon_contact,url_contact,name_contact) {
    const placeholder = document.createElement('div');
    placeholder.className = 'contact';
    placeholder.innerHTML = `
    <a href="${url_contact}" target="_blank"><i class="${icon_contact}"></i> <span>${name_contact}</span></a>
    `;
    return placeholder;
}
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


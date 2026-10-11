export const template_project = (src_picture_project,alt_picture_project,name_project,description_project,stack_project,url_watch,url_code) => {

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


export const card = () => {

    const hiden = !url_code ? 'hiden' : '' ; 

    const html = `
    <div class="card">
        <h2 data-i18n="${name_card}">name</h2>
        <div class="all">
            <label for="all_bars">
                <div class="info">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                </div>
            </label>
            <div class="all_bars" id="all_bars">
                <!-- Вызов темплейта -->
            </div>
            <button class="cool_button">
                <p>button</p>
            </button>
        </div>
    </div>
    `;

    const placeholder = document.createElement('div');
    placeholder.innerHTML =html.trim();
    return placeholder;
}


import '../libs/js-yaml/js-yaml.js';

let translations = {
    ru: null,
    en: null
}

async function fetchYaml(url) {
    const response = await fetch (url);
    if(!response.ok){
        throw new Error(`Ошибка сервера. HTTP-код: ${response.status}`);
    } else {
        const yamlText = await response.text();
        return jsyaml.load(yamlText);
    }
}

export async function gettingLocalization() {
    try {
        if (Object.values(translations).every(value => value === null)) {

            const [ruData,enData] = await Promise.all([
                fetchYaml('../data/locales/ru.yaml'),
                fetchYaml('../data/locales/en.yaml')
            ]);
    
            translations.ru = ruData;
            translations.en = enData;
    
            return translations;
        } else {
            return translations;
        }

    } catch (error) {
        console.error("Ошибка импорта", error); //TODO 
    }
}
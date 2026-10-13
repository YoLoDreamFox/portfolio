import '../libs/js-yaml/js-yaml.js';

let translations = {
    ru: null,
    en: null
}

async function fetchYaml(url) {
    const response = await fetch (url);
    const yamlText = await response.text();
    return jsyaml.load(yamlText);
}

export async function gettingLocalization() {
    try {
        const [ruData,enData] = await Promise.all([
            fetchYaml('../data/locales/ru.yaml'),
            fetchYaml('../data/locales/en.yaml')
        ]);

        translations.ru = ruData;
        translations.en = enData;

        return translations;

    } catch (error) {
        console.error("Ошибка импорта", error); //TODO 
    }
}
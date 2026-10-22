import '../libs/js-yaml/js-yaml.min.js';

let translations = {
    ru: null,
    en: null
}

const cache = new Map();

function cacheYaml(url) {
    if (!cache.has(url)) {
        const promise = fetchYaml(url).catch(err=>{
            cache.delete(url);
            throw err;
        });
        cache.set(url, promise);
    }
    return cache.get(url);
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
        const ruPromise = cacheYaml('./data/locales/ru.yaml');
        const enPromise = cacheYaml('./data/locales/en.yaml');
        if (Object.values(translations).every(value => value === null)) {

            const [ruData,enData] = await Promise.all([
                ruPromise,
                enPromise
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
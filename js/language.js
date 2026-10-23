import '../libs/js-yaml/js-yaml.min.js';


export const supportedLanguages = ['ru', 'en'];
const cache = new Map();

function localeUrl(language) {
    return `./data/locales/${language}.yaml`;
}

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
    }
    const yamlText = await response.text();
    return jsyaml.load(yamlText);
}

export async function gettingLocalization(language) {
    try {
        return await cacheYaml(localeUrl(language));
    } catch (error) {
        console.error(`Не удалось загрузить перевод (${language})`, error);
        return null;
    }
}

export function preloadOtherLanguages(currentLanguage) {
    const start = () => {
        for (const language of supportedLanguages) {
            if (language !== currentLanguage) {
                cacheYaml(localeUrl(language)).catch(() => {});
            }
        }
    };
 
    const schedule = () => {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(start);
        } else {
            setTimeout(start, 1000);
        }
    };
 
    if (document.readyState === 'complete') {
        schedule();
    } else {
        window.addEventListener('load', schedule, { once: true });
    }
}

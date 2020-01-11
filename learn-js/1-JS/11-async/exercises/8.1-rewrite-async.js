async function loadJson(url) {
    try {
        const response = await fetch(url);
        if (response.status === 200){
            const json = await response.json();
            return json;
        } else {
            throw new Error(response.status);
        }
    } catch(err) {
        console.log(err);
    }
}
const url = './8.1.json';
loadJson(url);
export async function UrlFetchApp(endpoint, method) {
    const config = {
        method,
        headers:{
            'Authorization': `Token ${process.env.EXPO_PUBLIC_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
    }
    const data = await fetch(endpoint, config);

    return await data.json();
}
export async function UrlPostApp(endpoint, method, body) {
    const config = {
        method,
        headers:{
            'Authorization': `Token ${process.env.EXPO_PUBLIC_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }
    const data = await fetch(endpoint, config);

    return await data.json();
}
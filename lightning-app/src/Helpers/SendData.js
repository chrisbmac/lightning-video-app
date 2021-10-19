export const fetcher = async (url, method, data) => {
  console.log('send data fetcher', data)
  const response = await fetch(url, {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    reffererPolicy: 'no-referrer',
    body: JSON.stringify(data),
  })
  return response.json()
}

const BACKEND_URL = 'https://findenlegeplads.team-ice.dk/api'

export async function login(credentials) {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`)
  }

  const data = await response.json()
  const jwt = data?.token // ?? data?.jwt ?? data?.accessToken andre måder at gøre det på, men vi ved vores hedder token.

  if (!jwt) {
    throw new Error('Login response did not contain a JWT token')
  }
  localStorage.setItem('jwtToken', jwt)
  
  return data
}

export async function getUserById(id){
  // GET requests must not include a body. Use fetchFromServer to include auth headers
  return await fetchFromServer(`users/${encodeURIComponent(id)}`, { method: 'GET' })
}

export async function RegisterUser(information){
    const response = await fetch(`${BACKEND_URL}/auth/register`, 
      {method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(information),
  })
  
  if(!response.ok){
    console.log("couldnt register user", response)
    throw new Error(`Registration failed: ${response.status}`)
    

  }   console.log("you made it this far 1")
      const data = await response.json()
      console.log("you made it this far 2", response)
      const user = {
        email: data.email,
        password: information.password
};

      login(user);

}




/*  ########################################################################## */
//Skal lige forstå følgende: includeAuth, providedJwt, optionMethod, optionHeaders, optionBody, restOptions
export async function fetchFromServer(url, options = {}) {
  const {
    includeAuth: includeAuthOption,
    method: optionMethod,
    headers: optionHeaders,
    body: optionBody,
    ...restOptions
  } = options

  const method = (optionMethod ?? 'GET').toUpperCase()
  const headers = optionHeaders ?? {} 
  const shouldIncludeAuth = includeAuthOption ?? true


  if (shouldIncludeAuth) {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('No JWT token available. Login first or provide a token.')
    }
    headers.Authorization = `Bearer ${token}`
  }

  let body = optionBody
  const hasBody = body !== undefined && body !== null && method !== 'GET' && method !== 'HEAD'

  if (hasBody && typeof body !== 'string') {
    headers['Content-Type'] = headers['Content-Type'] ?? 'application/json'
    body = JSON.stringify(body)
  }

  const requestOptions = {
    ...restOptions,
    method,
    headers,
  }

  if (hasBody) {
    requestOptions.body = body
  } 

  const finalUrl = /^https?:\/\//.test(url) // If url starts with http:// or https://, treat as absolute URL //forklar forstår ikke
    ? url
    : `${BACKEND_URL}${url.startsWith('/') ? '' : '/'}${url}`

  const response = await fetch(finalUrl, requestOptions)

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    throw new Error(`Request failed (${method} ${finalUrl}): ${response.status} ${errorText}`.trim())
  }

  const contentType = response.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    return response.json()
  }
  return response.text() //Forstår ikke helt hvorfor vi returnere text men det er fordi at hvis det ikke er json så kan det være en fejlbesked eller lignende som bare er tekst, og så vil vi gerne have den tekst tilbage i stedet for at prøve at parse det som json og så fejle. Det er en fallback for at håndtere ikke-json svar på en mere robust måde.
}
export function logout() {
  localStorage.removeItem('jwtToken')
}

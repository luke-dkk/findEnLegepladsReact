const BACKEND_URL = 'https://findenlegeplads.team-ice.dk/api'

export async function login(credentials) {
  
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    //includeAuth: false
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

export async function checkoutAll(parentId) {
  return await fetchFromServer('/checkoutall', {
    method: 'POST',
    body: { user_id: parentId },
  })

}


export async function checkin(playgroundId, parentId, children) {
  return fetchFromServer(
    `/playgrounds/${encodeURIComponent(playgroundId)}/checkins/checkin`,
    {
      method: "POST",
      body: {
        playground_id: playgroundId,
        user_id: parentId,
        children: children.map((id) => ({
          id: id,
        }))
      },
    }
  );
}

export async function attachAndCreateFacility(playground_id, facility_name) {
  return fetchFromServer(`/playgrounds/${encodeURIComponent(playground_id )}/facility/createandattach`, 
  {
        method: 'POST',
        body: {
             playground_id,
             facility_name
        }   
    })
}


export async function updateChild(userid, id, updatedChildData) {

  return  fetchFromServer(
    `users/${encodeURIComponent(userid)}/children/${encodeURIComponent(id)}`,
    {
      method: 'PUT',
      body: updatedChildData,
    }
  );
}

export async function deleteChild(userid, id) {
  return fetchFromServer(
    `users/${encodeURIComponent(userid)}/children/${encodeURIComponent(id)}`,
    { method: 'DELETE'
     }
  );
}

export async function createChild(userid, childData) {
  return fetchFromServer(
    `users/${encodeURIComponent(userid)}/children`,
    {
      method: 'POST',
      body: childData,
    }
  );
}

export async function getUserById(id){
  // GET requests must not include a body. Use fetchFromServer to include auth headers
  return fetchFromServer(`users/${encodeURIComponent(id)}`, { method: 'GET' })
}


export async function RegisterUser(information) {
  const data = await fetchFromServer('/auth/register', {
    method: 'POST',
    body: information,
    includeAuth: false
  });
  const user = {
    email: data.email,
    password: information.password
  };
  await login(user);
}


export async function getPlaygroundsNearLocation(latitude, longitude, radiusInMeters, page, size = 15)
{
  return fetchFromServer('/playgrounds/nearme', {
    method: 'POST',
    body: {
      latitude,
      longitude,
      radiusInMeters,
      page,
      size
    }
  });
}

export async function attachFacilityToPlayground(playgroundId, facilityId) {
  return fetchFromServer(`/playgrounds/${encodeURIComponent(playgroundId)}/facility/attach`,
    {
      method: 'POST',
      body: {
        facility_id: facilityId,
        playground_id: playgroundId,
      },
    })
}

export async function getAllFacilities() {
  const data = await fetchFromServer('/facility', {
    method: 'GET',
  })

  return Array.isArray(data) ? data : data.facilities || []
}


export async function getPlaygroundById(id) {
  return fetchFromServer(`/playgrounds/${encodeURIComponent(id)}`, {
    method: 'GET',
  })
}

export async function getActiveCheckIns(userId) {
  return fetchFromServer(`/checkin/${encodeURIComponent(userId)}`, {
    method: 'GET',
  })
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
  return response.text() 
  //Forstår ikke helt hvorfor vi returnere text 
  // men det er fordi at hvis det ikke er json så kan det være en fejlbesked eller lignende som bare er tekst,
  //  og så vil vi gerne have den tekst tilbage i stedet for at prøve at parse det som json og så fejle. 
  // Det er en fallback for at håndtere ikke-json svar på en mere robust måde.
}
export function logout() {
  localStorage.removeItem('jwtToken')
  //localStorage.clear() 
}



    import { useParams, useOutletContext  } from "react-router"
    import { getUserById } from "../../../apiReader.js";
/**
 * Decodes a JWT token and extracts the payload
 * @param {string} token - The JWT token
 * @returns {object} The decoded payload
 */
export function decodeJWT(token) {
  try {
    if (!token) return null;
    
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }
    
    // Decode the payload (second part)
    const decoded = JSON.parse(atob(parts[1]));
    return decoded;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

/**
 * Returns a merged object containing JWT payload and DB user info (if available).
 * @returns {Promise<object|null>} merged user info or null when no token
 */
export async function getUserFromToken() {
  const token = localStorage.getItem('jwtToken');
  if (!token) return null;

  const payload = decodeJWT(token);
  if (!payload) return null;

  const id = payload.id;
  console.log('Decoded JWT payload:', payload);
  console.log('User ID from token:', id);

  try {
    const dbUser = await getUserById(id);
    console.log('User info from database:', dbUser);
    // Merge token payload with DB user (DB values take precedence)
    return { ...payload, ...dbUser };
  } catch (error) {
    console.error('Failed to fetch user from DB:', error);
    // Fallback to token payload only
    return { ...payload };
  }
}

export function NotFound() {
        let params = useParams()
        return (
    <>
    404 the ressource: {params["*"]} you are looking for couldn't be found
    </>

        )
    }

      export function ShowName() {
        const { parentName } = useOutletContext();

        return (
            <>
            <p>Name: {parentName}</p>
            </>
        );
    }
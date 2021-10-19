// create guest session
// export const createGuestSession = async () => {
//     try {
//       const guestSession = await(await fetch(MOVIEDB_AUTH_GUEST_SESSION)).json()
//       if(guestSession.success) return localStorage.setItem("guestSession", guestSession.guest_session_id)
//     } catch(err) {
//       console.log('Error gueset sessions: ', err)
//     }
//   }
  
//   // autheticate user - create session
//   export const createSessionToken = async () => {
//     try {
//       // set temp token in local storage for now - not to serious
//       const tempToken = await(await fetch(MOVIEDB_AUTH_TOKEN_TEMP)).json()
//       if(tempToken.success) {
//         localStorage.setItem("tempToken", tempToken.request_token)
//         const URL = MOVIEDB_AUTHENTICATE + tempToken.request_token
//         window.location.replace(URL)
//       }
  
//     }catch(err) {
//       console.log('Error createing session tokens: ', err)
//     }
//   }
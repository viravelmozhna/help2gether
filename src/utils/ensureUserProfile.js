import { getDatabase, ref, get, set, child } from 'firebase/database';

/**
 * Ensures an Auth user has a matching RTDB profile at users/{uid}.
 * Creates a minimal profile (email) when missing.
 */
const ensureUserProfile = async function (user) {
  if (!user || !user.uid) {
    return null;
  }

  const db = getDatabase();
  const profileRef = child(ref(db), `users/${user.uid}`);
  const snapshot = await get(profileRef);

  if (snapshot.exists()) {
    const profile = snapshot.val() || {};
    // Backfill email if an old profile is missing it
    if (!profile.email && user.email) {
      await set(ref(db, `users/${user.uid}`), {
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
        email: user.email,
      });
      return {
        ...profile,
        email: user.email,
      };
    }
    return profile;
  }

  const newProfile = {
    firstName: '',
    lastName: '',
    phone: '',
    email: user.email || '',
  };

  await set(ref(db, `users/${user.uid}`), newProfile);
  return newProfile;
};

export default ensureUserProfile;

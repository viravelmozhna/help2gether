import { getDatabase, ref, get, child } from 'firebase/database';

/**
 * Admins are listed at admins/{uid} = true. The node can only be changed from
 * the Firebase console or CLI, and each user can read only their own entry.
 */
export const isAdmin = async function (uid) {
  if (!uid) {
    return false;
  }

  try {
    const snapshot = await get(child(ref(getDatabase()), `admins/${uid}`));
    return snapshot.val() === true;
  } catch (error) {
    return false;
  }
};

/**
 * A demand's details can be edited by its creator or by an admin.
 * Mirrors the demands/$demandId write rule in database.rules.json.
 */
const canEditDemand = function (demand, uid, userIsAdmin) {
  if (!uid || !demand) {
    return false;
  }

  return userIsAdmin || demand.createdBy === uid;
};

export default canEditDemand;

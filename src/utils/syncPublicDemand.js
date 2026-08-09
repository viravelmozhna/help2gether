import { getDatabase, ref, set, get, child } from 'firebase/database';
import toPublicDemand from './toPublicDemand';

const syncPublicDemand = async function (demandId, demandData) {
  if (!demandId) {
    return;
  }

  const db = getDatabase();
  let source = demandData;

  if (!source) {
    const snapshot = await get(child(ref(db), `demands/${demandId}`));
    if (!snapshot.exists()) {
      return;
    }
    source = snapshot.val();
  }

  const publicDemand = toPublicDemand(source);
  if (!publicDemand) {
    return;
  }

  await set(ref(db, `publicDemands/${demandId}`), publicDemand);
};

export default syncPublicDemand;

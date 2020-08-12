import axios from 'axios';

export default async function ValidateRpc(args) {
  try {
    const url = args.tzstatsUrl;
    // eslint-disable-next-line no-unused-vars
    const response = await axios.get(`${url}/explorer/block/head`);
    return true;
  } catch (error) {
    return false;
  }
}

import ImageKit from 'imagekit';

import env from './env';

const { IMAGEKIT_ENDPOINT, IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY } = env;

const imageKit = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY,
  privateKey: IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: IMAGEKIT_ENDPOINT,
});

export default imageKit;

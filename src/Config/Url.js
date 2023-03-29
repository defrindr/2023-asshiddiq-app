// export const BASE_URL = 'https://papuabaratprov.go.id/web/api'; // change this to your local ip address
// export const BASE_URL = 'https://codexacademy.id/papuabarat/web/api/'; // change this to your local ip address
// export const BASE_URL = 'http://192.168.1.3/papua/web/api/'; // change this to your local ip address
export const BASE_URL = 'https://codexacademy.id/resto2/web/api/'; // change this to your local ip address

const VERSION = '';

const GET_URL = path => {
  let newPath = '';
  if (VERSION !== '') {
    newPath = `${BASE_URL}/${VERSION}/${path}`;
  } else {
    newPath = `${BASE_URL}/${path}`;
  }

  // remove double slash
  newPath = newPath.replace(/([^:]\/)\/+/g, '$1');

  return newPath;
};

export const API = {
  AUTH: {
    LOGIN: GET_URL('/user/login'),
    REFRESH_TOKEN: GET_URL('/user/refresh'),
    LOGOUT: GET_URL('/user/logout'),
    REGISTER: GET_URL('/user/register'),
  },
  PROFILE: {
    UPDATE: GET_URL('/user/update-profile'),
    VIEW: GET_URL('/user/user-view'),
    REFERRAL: GET_URL('/user/referral'),
    SETTING: GET_URL('/setting/get-setting'),
    GAJI: GET_URL('/setting/master-gaji'),
  },
  Info: {
    TAC: 'https://codexacademy.id/resto2/web/site/term',
    PRIVACY_POLICY: 'https://codexacademy.id/resto2/web/site/privacy',
  },
  HOME: {
    INDEX: GET_URL('/setting/halaman-awal'),
  },
  BERITA: {
    ALL: GET_URL('/berita/all'),
    DETAIL: GET_URL('/berita/detail-berita?id='),
  },
  DOWNLOAD: {
    INDEX: GET_URL('setting/download-file'),
  },
  NOTIFICATION: {
    ALL: GET_URL('notifikasi/all'),
    DETAIL: GET_URL('notifikasi/DETAIL'),
  },
  TABUNGAN: {
    MAXIMUM: GET_URL('/setting/max'),
    HISTORY: GET_URL('/tabungan/tabungan'),
    TOPUP: GET_URL('/tabungan/bayar'),
    DETAIL: GET_URL('/tabungan/detail-tabungan'),
    CANCEL: GET_URL('/tabungan/cancel-tabungan'),
  },
  INVESTASI: {
    MAXIMUM: GET_URL('/setting/max'),
    LIST: GET_URL('/investasi/jenis-investasi'),
    HISTORY: GET_URL('/investasi/investasi'),
    TOPUP: GET_URL('/investasi/bayar'),
    DETAIL: GET_URL('/investasi/detail-investasi'),
    CANCEL: GET_URL('/investasi/cancel-investasi'),
  },
  HISTORY: {
    GRAFIK: GET_URL('setting/grafik'),
  },
};

export default {
  BASE_URL,
  API,
  GET_URL,
};

import { _HTTP_AUTH_PRD } from '../fixtures/_prv_data.constants';

export const LOGIN_CONFIG = {
  INPUT: {
    USERNAME: {
      REQUIRED: 'Idenfiant requis',
    },
    PASSWORD: {
      REQUIRED: 'Mot de passe requis',
    },
  },
  DOMAIN: {
    FIRST_LABEL: 'ADJCDCORP',
    LAST_LABEL: 'UNKNOWN',
    LENGTH: 31,
    FRANCE: {
      LABEL: 'ADJCDFRANCE',
      VALUE: 'fr.jcdecaux.org',
    },
  },
  REQUEST: {
    USERNAME: _HTTP_AUTH_PRD.USERNAME,
    PASSWORD: _HTTP_AUTH_PRD.PASS,
    DOMAIN: _HTTP_AUTH_PRD.DOMAIN,
  },
};

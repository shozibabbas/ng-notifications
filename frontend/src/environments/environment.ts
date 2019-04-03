import {HttpHeaders} from '@angular/common/http';

export const environment = {
  production: false,
  httpOptions: {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  },
  INFO_TIMEOUT: 90000
};

let env = process.env.NODE_ENV || 'development';

import { Config } from 'globals';

export let settings: Config = {
  name: 'analytics',
  version: '1.0.0',
  port: 8083,
  env: 'development'
};

if (env === 'production') {
  settings.env = 'production';
}

export let schema = {
  "type": "object",
  "properties": {
    "app_name": { "type": "string" },
    "app_version": { "type": "string" },
    "tab_id": { "type": "string" },
    "session_id": { "type": "string" },
    "user_id": { "type": "number" },
    "client_time": { "type": "string" },
    "ip_addr": { "type": "string" },
    "event_type": { "type": "string" },
  },
  "required": ["app_name", "app_version", "session_id", "user_id", "client_time", "ip_addr", "event_type"]
};
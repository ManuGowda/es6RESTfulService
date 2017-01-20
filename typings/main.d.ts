declare module "globals" {

  export interface Event {
    app_name: string;
    app_version: string;
    tab_id: string;
    session_id: string;
    user_id: number | string;
    client_time: string | number;
    ip_addr: string;
    type: string;
  }

  export interface Topic {
    topic: string;
    messages: string;
    partition: number;
    attributes?: number;
  }

  export interface Config {
    name: string;
    port: number;
    env: string;
    version: string;
  }
}
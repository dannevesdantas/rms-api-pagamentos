export interface IMessaging {
    publish(payload: any): Promise<any>;
}

export const IMessaging = Symbol('IMessaging');

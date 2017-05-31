export class Storage {

    public static insertToken(data?: any): any {
        var data = data || {};
        data.account = localStorage.getItem('account');
        data.token = localStorage.getItem('token');
        return data
    }

    public static updateToken(data?: any): void {
        localStorage.setItem('account', data.account);
        localStorage.setItem('token', data.token);
    }

    public static checkToken(): boolean {
        return localStorage.getItem('account') && localStorage.getItem('token') ? true : false;
    }

    public static cleanToken(): void {
        localStorage.clear();
    }
}

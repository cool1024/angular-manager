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
}

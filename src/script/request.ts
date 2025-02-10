import {SHA256} from 'crypto-js';

export class Request {
    private static instance: Request;
    private isLogin:boolean = false;
    // 网站登陆跳转地址
    private loginUrl = '/#/login';

    private header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': ''
    }
    private authorization = {
        'token': '',
        'refreshToken': '',
        'expires': ''
    }

    public static getInstance(): Request {
        if (!this.instance) {
            this.instance = new Request();
        }
        return this.instance;
    }

    public getIsLoggedIn(): boolean {
        return this.isLogin;
    }

    private constructor() {
        this.authorization.token = localStorage.getItem('token') ?? '';
        this.authorization.refreshToken = localStorage.getItem('refreshToken') ?? '';
        this.authorization.expires = localStorage.getItem('expires') ?? '';
        this.isLogin = !!this.authorization.token && !this.isTimeExceeded(this.authorization.expires);
    }

    private isTimeExceeded(targetTime: string): boolean {
        const currentTime = new Date();
        const targetDate = new Date(targetTime);
        return currentTime > targetDate;
    }

    public async check(): Promise<boolean> {
        if (this.authorization.refreshToken === '' || this.authorization.expires === '') {
            // 跳转到登陆页面
            window.location.href = this.loginUrl;
            this.isLogin = false;
            return false;
        }
        if (this.isTimeExceeded(this.authorization.expires)) {
            if (await this.refresh()) {
                this.header.Authorization = `Bearer ${this.authorization.token}`;
                this.isLogin = true;
                return true;
            } else {
                // 跳转到登陆页面
                window.location.href = this.loginUrl;
                this.isLogin = false;
                return false;
            }
        }
        return true;
    }

    public calculateSHA256(input: string): string {
        return SHA256(input).toString();
    }

    public async login(username: string, password: string) {
        let passwordHash = this.calculateSHA256(password);
        let response = await fetch("/api/Auth/Login", {
            method: 'POST',
            headers: this.header,
            body: JSON.stringify({
                username: username,
                password: passwordHash
            })
        });
        if (response.ok) {
            let data = await response.json();
            this.authorization.token = data.token["accessToken"];
            this.authorization.expires = data.token["expires"];
            this.authorization.refreshToken = data.token["refreshToken"];
            localStorage.setItem('refreshToken', this.authorization.refreshToken);
            localStorage.setItem('token', this.authorization.token);
            localStorage.setItem('expires', this.authorization.expires);
            window.location.href = '/';
            this.isLogin = true;
            return true;
        }
        return false;
    }
    public logout() {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        localStorage.removeItem('expires');
        this.isLogin = false;
        this.authorization = {
            'token': '',
            'refreshToken': '',
            'expires': ''
        }
        window.location.href = "/";
    }

    private async refresh() {
        this.header.Authorization = `Bearer ${this.authorization.refreshToken}`;
        let response = await fetch("/api/Auth/Refresh", {
            method: 'GET',
            headers: this.header
        })
        if (response.ok) {
            let data = await response.json();
            this.authorization.token = data.token.accessToken;
            this.authorization.expires = data.token.expires;
            this.authorization.refreshToken = data.token.refreshToken;
            localStorage.setItem('refreshToken', this.authorization.refreshToken);
            localStorage.setItem('token', this.authorization.token);
            localStorage.setItem('expires', this.authorization.expires);
            this.isLogin = true;
            return true;
        }
        return false;
    }

    public async Get<T=any>(url: string, check: boolean = true,notFoundRedirect:()=>void=()=>{}): Promise<T> {
        if (check) {
            if(!(await this.check())){
                window.location.href = this.loginUrl;
            }
        }
        this.header.Authorization = `Bearer ${this.authorization.token}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: this.header
        });
        if (!response.ok) {
            if(response.status == 404){
                notFoundRedirect();
            }
            if(response.status == 403){
                if(!(await this.refresh())){
                    window.location.href = this.loginUrl;
                    return null as T;
                }
            }
        }
        return await response.json() as T;
    }

    public async Post<T=any>(url: string, body: any, check: boolean = true,notFoundRedirect:()=>void=()=>{}): Promise<T> {
        if (check) {
            if(!(await this.check())){
                window.location.href = this.loginUrl;
            }
        }
        this.header.Authorization = `Bearer ${this.authorization.token}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: this.header,
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            if(response.status == 404){
                notFoundRedirect();
            }
            if(response.status == 403){
                if(!(await this.refresh())){
                    window.location.href = this.loginUrl;
                    return null as T;
                }
            }
        }
        return await response.json() as T;
    }
}

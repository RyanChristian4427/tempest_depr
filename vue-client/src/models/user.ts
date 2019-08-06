export default class User {
    private readonly name: string;
    private readonly email: string;
    private readonly token: string;

    constructor(name: string, email: string, token: string) {
        this.name = name;
        this.email = email;
        this.token = token;
    }

    public getName() {
        return this.name;
    }

    public getEmail() {
        return this.email;
    }

    public getToken() {
        return this.token;
    }
}

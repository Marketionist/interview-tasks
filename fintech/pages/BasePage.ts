import { UserDataInterface } from './UserDataInterface';

export class BasePage {
    public baseUrl: string;
    public userEmail: string;
    public userPassword: string;
    public textFirstName64Chars: string;
    public textLastName64Chars: string;
    public timestamp: number;
    public userDataEn: UserDataInterface;
    public userDataFr: UserDataInterface;

    public createEmailWithTimestamp (number = 0): string {
        return this.userEmail.replace('@', `${this.timestamp + number}@`);
    }

    constructor () {
        this.baseUrl = 'https://app.qa.nesto.ca';
        this.userEmail = process.env.USER_LOGIN ?? 'gpcamwyk@sharklasers.com';
        this.userPassword = process.env.USER_PASS ?? 'testTest1111';
        this.textFirstName64Chars = 'A'.repeat(64);
        this.textLastName64Chars = 'B'.repeat(64);
        this.timestamp = new Date().getTime();
        this.userDataEn = {
            language: 'en',
            firstName: 'Alpha',
            lastName: 'Bravo',
            phone: '+16131234567',
            region: 'ON',
            email: this.createEmailWithTimestamp(),
            password: this.userPassword,
            leadDistributeConsentAgreement: false,
        };
        this.userDataFr = {
            language: 'fr',
            firstName: 'Adélaïde',
            lastName: 'Barrière',
            phone: '+14181234567',
            region: 'QC',
            email: this.createEmailWithTimestamp(1),
            password: this.userPassword,
            leadDistributeConsentAgreement: false,
        };
    }
}

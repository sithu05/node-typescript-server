export class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly provider: string;
    readonly password: string;
    readonly role: string;
}
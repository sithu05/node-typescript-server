export class CreateRoleDto {
    readonly name: string;
    readonly permissions: Array<string>;
    readonly active: boolean;
}
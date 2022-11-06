import { UserRole } from '../enum';
import { TemplateModel } from './_template.model';

export class User extends TemplateModel {
    username: string;
    password: string;
    role: UserRole;
}

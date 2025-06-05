import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(body: any): Promise<{
        id_user: number;
        url_photo_profil: string | null;
        lastname: string;
        firstname: string;
        role: string;
        pseudo: string;
        sexe: string;
        email: string;
        password: string;
        address: string | null;
        city: string | null;
        description: string | null;
        createdAt: Date;
        acceptedPrivacyPolicy: boolean;
    }>;
}

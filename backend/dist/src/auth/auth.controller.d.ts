import { AuthService } from "./auth.service";
import { AuthDto } from "src/dto/auth.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(authDto: AuthDto): void;
}

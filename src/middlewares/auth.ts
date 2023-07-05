
import { Request, Response, NextFunction } from 'express';
import { BusinessExceptions } from '../exceptions/BusinessExceptions';
import ClientService from '../modules/Client/client.service';
import { log } from 'console';

export async function auth(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
    const clientService = new ClientService();

    if (authorizationHeader && authorizationHeader.startsWith('Basic ')) {
        const encodedCredentials = authorizationHeader.slice(6);
        const decodedCredentials = atob(encodedCredentials);
        const [login, senha] = decodedCredentials.split(':');
        console.log("login", login);
        console.log("senha", senha)

        try {
            const userLogin = await clientService.getUser(login, senha);

            if (!userLogin) {
                return res.status(401).send()
            } else {
                //@ts-ignore
                req.user = userLogin;
                next();

            }
        } catch (error) {
            return res.status(500).send()
        }



    } else {

        return res.status(401).send()
    }


}
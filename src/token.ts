import axios from "axios";
import fs from 'node:fs';
import FormData from 'form-data';


export enum MsgType {
    Group = "https://open.larksuite.com/open-apis/message/v4/send",
    Direct = "https://open.larksuite.com/open-apis/message/v4/send",
    Ephemeral = "https://open.larksuite.com/open-apis/ephemeral/v1/send"

}

export class Credentials {
    app_id: string | undefined;
    app_secret: string | undefined;
    img_path_file: string = ''
}

export class Token extends Credentials {
    constructor(credentials: Credentials) {
        super();
        this.app_id = credentials.app_id;
        this.app_secret = credentials.app_secret;
        this.img_path_file = credentials.img_path_file;
    }

    public async generateToken() {
        try {
            const response = await axios({
                method: "GET",
                url: `https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal`,
                params: {
                    "app_id": this.app_id,
                    "app_secret": this.app_secret
                },
            });
            return await response.data.tenant_access_token;
        } catch (err) {
            console.log(err)
        }
    }

    public async uploadImg(tenant: string) {
        try {
            const form = new FormData();
            form.append('image_type', 'message');
            form.append('image', fs.createReadStream(this.img_path_file));

            const response = await axios({
                method: 'post',
                url: 'https://open.larksuite.com/open-apis/im/v1/images',
                headers: {
                    'Authorization': `Bearer ${tenant}`,
                    'Content-Type': 'multipart/form-data',
                    ...form.getHeaders()
                },
                data: form
            });
            return await response.data.data.image_key

        } catch (err) {
            throw err;
        }
    }

    public async sendMsg(data: object, tenant: string, email: string) {
        try {
            const endpoint: string = MsgType.Direct;
            const response = await axios({
                method: "POST",
                url: endpoint,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tenant}`
                },
                data: {
                    ...data,
                    "email": email
                }
            });
            console.log(`Message result: ${response.data.msg}`);
        } catch (err) {
            throw err
        }

    }

}
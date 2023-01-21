import { Token } from "./token";
import fs from 'node:fs';
import FormData from 'form-data'
import axios from 'axios'


export enum Colors {
    red = "RED", blue = "BLUE", orange = "ORANGE"
}

export enum ButtonType{
    primary ="primary", danger="danger", regular ="regular"
}

export class MessageCard{
    private data: any = {};

    /**
     * @param content - Content description of your card
     * @returns - Returns JSON response
     */
    public description(content: string) {
        return {
            'tag': 'div',
            'text': {
                "content": content,
                "tag": "lark_md"
            }
        }
    }
    /**
     * @param img_key - Image key generate by lark api after uploading
     * @param content - The description of your image
     * @example
     * const instance = new MessageCard();
     * const json = instance.generate().card().elements(instance.image("image_key","content"))
     */
    public image(img_key: string, content: string, tooltip:string = content) {
        return {
            "alt": {
                "content": tooltip,
                "tag": "plain_text"
            },
            "img_key": img_key,
            "tag": "img",
            "title": {
                "content": content,
                "tag": "lark_md"
            }
        }
    }

    /**
     * @param content - Content text of your fields 
     * @example
     * const instance = new MessageCard();
     * const json = instance.generate().card().elements(instance.fields(["Hello","world"...]))
     * @returns - JSON response from fields arguments
     */
    public fields(content: string[]): object {
        const fields = [];
        for (let i = 0; i < content.length; i++) {
            fields.push({
                is_short: true,
                text: { content: content[i], "tag": "lark_md" }
            });
        }
        return { tag: "div", fields };
    }

    /**
     * 
     * @param extra_element - extra element refers to the element that needs extra
     * @param extra - the extra elements value
     * @example
     * instance.generate().elements(
     * msgCard.extra(msgCard.description("Hello"), msgCard.button("This is the url","Download",ButtonType.primary))
     * )
     */
    public extra(extra_element: object, extra: object) {
        const newObject:object = {...extra_element, extra};
        return newObject;
    }

    /**
     * @returns - returns horizontal line of a card
     */
    public hr(){
        return {
            "tag":"hr"
        }
    }

    /**
     * 
     * @param url - Button URL uses to make client redirect to the link value
     * @param button_name - Name of the button
     * @param button_type - Type of the button
     * @example
     * //Available button type for now
     * //-Primary [blue]
     * //-Danger [red]
     * //-Regular [gray]
     * msgCard.generate().card().elements(
     * msgCard.button("Button URL","Button Name", ButtonType.primary)
     * )
     */
    public button(url: string, button_name: string, button_type: ButtonType) {
        return {
            "tag": "button",
            "text": {
                "tag": "lark_md",
                "content": button_name
            },
            "type": button_type,
            "url": url
        }
    }
    /**
     * 
     * @returns - Returns card value
     */
    generate() {
        return {
            /**
             * 
             * @param message_type - Message type value could be optional but default could set as interactive
             * @example
             * new MessageCard().generate().message_type("interactive")
             * @returns 
             */
            message_type: (message_type: string = "interactive") => {
                this.data["msg_type"] = message_type;
                return this;
            },
            card: () => {
                if (!this.data.hasOwnProperty("card")) this.data["card"] = {}
                if (!this.data["card"].hasOwnProperty("config")) this.data["card"]["config"] = {}
                this.data["card"]["config"]["wide_screen_mode"] = true;
                this.data["card"]["config"]["enable_forward"] = true;
                return {
                    config: (wide_screen_mode: boolean = this.data["card"]["config"]["wide_screen_mode"], enable_forward: boolean = this.data["card"]["config"]["enable_forward"]) => {
                        this.data["card"]["config"]["wide_screen_mode"] = wide_screen_mode;
                        this.data["card"]["config"]["enable_forward"] = enable_forward;
                        return this;
                    },
                    header: (title: string, color: Colors) => {
                        if (!this.data["card"].hasOwnProperty("header")) this.data["card"]["header"] = {}
                        this.data["card"]["header"]["template"] = color;
                        this.data["card"]["header"]["title"] = {
                            "content": title,
                            "tag": "plain_text"
                        };
                        return this;
                    },
                    elements:(...element: object[]) => {
                        if (!this.data["card"].hasOwnProperty("elements")) this.data["card"]["elements"] = []
                        this.data["card"]["elements"] = element;
                        return this;
                    },
                    build: () => this.data
                }
            },
        }
    }
}

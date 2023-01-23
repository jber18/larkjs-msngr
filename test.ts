import { ButtonType, Colors, MessageCard } from "./src/messageCard";
import { Credentials, MsgType, Token } from "./src/token";
const creds = new Credentials();


creds.app_id = "<app_id_here>";
creds.app_secret = "<app_secret_here>";
creds.img_path_file = "./file_path.png"; // This part is optional
(async () => {
    const lark = new Token(creds);
    const token = await lark.generateToken();
    const img_key = await lark.uploadImg(token);

    const msgCard = new MessageCard()
    const json = msgCard.generate().message_type()
        .generate().card().config(true, true)
        .generate().card().header("This is Header", Colors.blue)
        .generate().card().elements(
            msgCard.image(img_key,"Image Description"),
            msgCard.description("Hi <at id=all></at>,\n This is description \n\n Thank you 😉"),
            msgCard.hr(),
            msgCard.fields(["Value 1", "Value 2", "Value 3", "Value 4"]),
            msgCard.extra(msgCard.description("Nice"), msgCard.button("https://www.example.com", "Download", ButtonType.regular)),
            msgCard.hr(),
            msgCard.description("This is Description")
        ).generate().card().build();

    lark.sendMsg(json, token,"<your_email_here>")

})()

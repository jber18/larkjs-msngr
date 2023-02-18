# Lark bot Message Card Builder
**For Context this library is used for sending message card on larksuite Messenger, this would save your time building json strings just for the layout of your message card**

## To get Started
You need to install the necessary third-party libaries to make things work
1. Axios
2. Form-Data

Copy this line to your terminal to install these libraries
> npm i axios form-data

## Features
- Sends Message easily
- Automatic JSON Builder
- No manual uploads of image

# Documentation

Import the libraries and create instance

```js
import { ButtonType, Colors, MessageCard } from "./lark_msgcard/src/messageCard";
import { Credentials, MsgType, Token } from "./lark_msgcard/src/token";
const creds = new Credentials();
```

Initialize 
> app_id and app_secret

```js
creds.app_id = '<app_id_here>';
creds.app_secret = '<app_secret_here>';
```

Optional instance when using image

> img_path_file

```js
creds.img_path_file = '<image_file_path>';
```

## Create instance on Token class passing the value of Credentials class

```js
const lark = new Token(creds);
```
By doing this, you're adding your initializations value to Token class to generate **tenant_token**

## Generate tenant_token

```js
const token = await lark.generateToken();
```
> For generating tenant_token it returns promises and needed to use await
so it's necessary to enclose to asynchronous function just like this

```js
(async() => {
  const token = await lark.generateToken();
)()
```

## Message Card

You need to create instance of Message Card class and call every methods you needed

```js
  const msgCard = new MessageCard();
```

The problemm here that if you call directly the msgCard instance you will get
the incorrect value of JSON string which has "data" object that suposedly not
to be included when making message card, so to fix this you need to assign
the instance to variable and just call the method just like this

```js
  const json = msgCard.generate().message_type().generate().card().config(true, true)
```

The .config(boolean, boolean) method is sets the default value as true which means it will dynamically
adjust its width and height depending on the window size

## Header

Adding header is Optional but you can do it like this

```js
  const json = msgCard.generate().message_type()
        .generate().card().config(true, true)
        .generate().card().header("This is Header", Colors.blue) //First Argument is the content of your header and Second Argument represent as color
```

## Elements

The *Elements* is where the card contents wrap in, there are many types of value you can put inside *Elements*
These are the following

 - Fields
 - Description
 - Image
 - Button
 - Horizontal line
 etc...
 
 ### Element values
 
 ```js
 const json = msgCard.generate().message_type()
        .generate().card().config(true, true)
        .generate().card().header("This is the header", Colors.blue)
        .generate().card().elements(
            msgCard.image(img_key,"This is Image Description"),
            msgCard.description("Hi <at id=all></at>,\n This is description"),
            msgCard.hr(),
            msgCard.fields(["Value 1", "Value 2", "Value 3", "Value 4"]),
            msgCard.extra(msgCard.description("Extra Description"), msgCard.button("https://www.example.com", "Download", ButtonType.regular)), //Button types Regular, Danger and Primary
            msgCard.hr(),
            msgCard.description("This is Description")
        ).generate().card().build();
 ```
 
 ### Send the Message Card
 
 ```js
  lark.sendMsg(json, token,"<your_email_here>")
 ```
 
 
 Note as other markdown like:
  - Hyperlink
  - Bold
  - Italic
  
 You can do the same..
 
 ## Generating *Image Key*
 
 ```js

    //Initialize image path
    creds.img_path_file = "<image_file_path_here>";
 
    // Creating intance of Token passing value being declared on creds
    const lark = new Token(creds);
    
    const token = await lark.generateToken(); //Generates token
    const img_key = await lark.uploadImg(token); //Using token to upload image to lark server
 
 ```

Please take note that this is not the official library of larksuite messenger


For full documentation visit Larksuites Official Documentation






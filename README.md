# React + Vite
## environment
We need to import some plug-ins and libraries normally to make the program work properly

Make sure you're in the root directory of your application and run the following terminal command:
npm install nanoid
npm install dexie
npm install dexie-react-hooks
![alt text](image.png)

## PWA
We first need to open lighthouse in developer mode to see if the entire application supports pwa.
![alt text](81f8fb3ff8bc1af44a2350cf90eb8c8.png)
If the operation is normal, you can perform the following operations:
click here
![alt text](image-1.png)
In this way, you can try to simulate running on the pc side.
## Vercel
If the above steps work properly, you can continue with the following operations:
First, import the project's library into vercel.
![alt text](7436559582fd5fc3c1d7c4dc23aeffa.png)
The next imported program is deployed to vercel.
![alt text](24312fdf2c11dcab933da8a86e6e2f6.png)
After successful deployment, the application interface will be displayed on the left side of the page, of course, it may not be displayed normally, at this time you need to check your relevant configuration file.
![alt text](2d3f1ee166ba597ed52fc82e6888af9.png)
If this is displayed correctly, you can click on the connection under Domains. Normally, you'll get the result of the second picture
![alt text](1712694456758.png)
![alt text](845deead44bfdd762aed1d5de44cd2d.png)

## Deploy on mobile
If the last step in Vercel appears properly, we can transfer the connection to the phone and open your connection in the browser.
![alt text](8b68c94b825cbca597c16141e532b98.jpg)
Then we can click Add to Home screen and we have successfully deployed it to our phone.
![alt text](image-2.png)
![alt text](fd90c349a6fa00f1b3fa20f11ab6697.jpg)

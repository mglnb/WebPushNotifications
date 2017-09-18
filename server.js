const webpush = require('web-push');
const firebase = require('firebase');
var config = {
    apiKey: "AIzaSyC42D0LlbGyHtgYZ6ur8Q6y3ddn27Lcogs",
    authDomain: "firstproject-981ac.firebaseapp.com",
    databaseURL: "https://firstproject-981ac.firebaseio.com",
    projectId: "firstproject-981ac",
    storageBucket: "firstproject-981ac.appspot.com",
    messagingSenderId: "988462700489"
};
firebase.initializeApp(config);


// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys.publicKey);
// console.log(vapidKeys.privateKey);
// process.exit();

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    'BE8PyI95I_jBIfb_LTS_nkUJnOwjLP2zAaGBSFEi3jmFJ3l5ox7-NtNqrVuyPL4Qmt4UxDI-YgwYI1sEMIpoU90',
    'Rs4ALPgHaAgjaOUrihdpNCaSWtUTPu5ZyU-oHBetX0E'
    );

firebase.database().ref('pushs/')
.on('value', function (snapshot) {
    snapshot.forEach(({key}) => {
        console.log(key)
        console.log(snapshot.val()[key].endpoint)
        const subscription = {
            endpoint: snapshot.val()[key].endpoint,
            keys: {
                p256dh: snapshot.val()[key].keys.p256dh,
                auth: snapshot.val()[key].keys.auth,
            },
        };

        const notification = JSON.stringify({
            title: 'Miguel',
            body: 'Coé mlk',
            url: 'https://twitter.com/stahlstadtjs',
        });

        webpush.sendNotification(subscription, notification)
        .then(success => console.log(success))
        .catch(error => console.log(error));
    })
});




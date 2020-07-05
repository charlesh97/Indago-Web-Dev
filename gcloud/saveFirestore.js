const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const GeoPointFirestore = admin.firestore.GeoPoint;
const db = admin.firestore();

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.saveToFirestore = (event, context) => {
    const attributes = event.attributes;
    const deviceId = attributes.deviceId;

    const payload = JSON.parse(Buffer.from(event.data, 'base64'));
    console.log(payload);

    coord = {
        "lat": parseFloat(payload.lat),
        "long": parseFloat(payload.long)
    }

    let docRef = db.collection('device-database').doc(deviceId);
    let setAda = docRef.set({
        deviceId: deviceId,
        enabled: payload.enabled,
        index: payload.index,
        currentLat: coord.lat,
        currentLong: coord.long,
        temperature: parseFloat(payload.temperature),
        timestamp: payload.time
    }, {merge: true} );
    
    addToLocationCollection(docRef, coord, payload.time);
};

function addToLocationCollection(docRef, coord, timestamp){
    let location = new GeoPointFirestore(coord.lat, coord.long);
    return docRef.collection('location-log').add({
        location,
        timestamp: timestamp
    });
}
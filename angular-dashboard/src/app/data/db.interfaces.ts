import {  } from '@angular/fire/firestore/interfaces';

/* Here is the custom User data that is stored on a per user basis */
/* This is independent of the login information */
export interface User {
    displayName?: string;
    email?: string;
    phoneNumber?: string;
    photoURL?: string;
    providerId?: string;
    uid?: string;
    authDeviceList?: string[];
    testParam?: string;
}


/* Here is the device data that is stored */ 
export interface Device {
    nickname?: string;
    serialnumber?: string;
    linkedphone?: string;
    lastseen?: string;
    batterylife?: number;
    timetocharge?: bigint;
    trackEnable?: boolean;

    bleEnable?: boolean;
    lowPowerEnable?: boolean;
    gpsFreq?: number;
    uploadPeriod?: bigint;

    currentLat?: number; 
    currentLong?: number;
    temperature?: number;
    timestamp?: string;
}
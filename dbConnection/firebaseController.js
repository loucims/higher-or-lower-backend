

export class FirebaseController {
    firebase
    verbose = false
    fullVerbose = false
    constructor(firebase) {
        this.firebase = firebase
    }

    async remove(path) {
        var ref = this.firebase.ref(path)
        this.log("remove", path)
        await ref.remove()
        return
    }
    async getData(path) {
        var ref = this.firebase.ref(path)
        this.log("get", path)
        var ret = await ref.once('value')
        let data = ret.val()
        this.logData("get", data)
        return data
    }

    async getDataPaginated(path, limit, startAfterKey) {
        let ref = this.firebase.ref(path).orderByKey();

        if (limit) {
            ref = ref.limitToFirst(limit);
        }

        if (startAfterKey) {
            ref = ref.startAfter(startAfterKey);
        }

        this.log("getData", path);
        const snapshot = await ref.once('value');
        const data = snapshot.val();
        this.logData("getData", data);
        return data;
    }


    async setData(path, data) {
        var ref = this.firebase.ref(path)
        this.log("setData", path)
        await ref.set(this.sanitizeProperties(data))
        this.logData("setData", data)
        // await ref.set(data)
        return
    }
    async pushData(path, data) {
        var ref = this.firebase.ref(path)
        var newKey = await ref.push(this.sanitizeProperties(data)).then((snapshot) => {
            this.log("pushData", path+" new value:"+snapshot.key)
            this.logData("pushData", data)
            return snapshot.key
        })
        return newKey
    }

    sanitizeProperties(data) {
        if (data == undefined) { return {}}
        var sanitizedData = {}
        if (typeof data == "object") {
            console.log('its an object!')
            for (let index in data) {
                if (data[index] != undefined) {
                    if (typeof data[index] == "object") {
                        sanitizedData[index] = this.sanitizeProperties(data[index])
                    } else {
                        if (this.isTypeAllowed(data[index])) {
                            sanitizedData[index] = data[index]
                        }
                    }
                } 
            }   
        } else {
            sanitizedData = data
        }
        console.log(sanitizedData)
        return sanitizedData
    }

    isTypeAllowed(property) { 
        if (typeof property == "string") { return true }
        if (typeof property == "number") { return true }
        if (typeof property == "boolean") { return true }
        return false
    }

    log(action, path) {
        if (this.verbose) {
            console.log("[Firebase] " + action + " " + path)
        }
    }

    logData(action, data) {
        if (this.fullVerbose) {
            console.log("[Firebase] " + action + " data: " + JSON.stringify(data))
        }
    }
}
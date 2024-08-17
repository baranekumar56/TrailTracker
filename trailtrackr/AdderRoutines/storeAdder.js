const fs = require('fs')

const data = JSON.parse(fs.readFileSync('./resources/reducedStores.json','utf-8'))
const locations = JSON.parse(fs.readFileSync('./resources/reducedStoreLocations.json', 'utf-8'))
delete data['']
let res = []

for (const i in data){
    const stores = data[i]
    for (const j of stores){
        if (locations[j[0]]){
            const l = locations[j[0]]
            let obj = {}
            obj['centerId'] = j[0]
            obj['type'] = 'S'
            obj['address'] = j[1]
            obj['city'] = j[2]
            obj['state'] = j[3]
            obj['phoneNumber'] = j[5]
            obj['location'] = {'latitude':Number(l['Latitude']), longitude:Number(l['Longitude'])}
            res.push(obj) 
        }
    }
}

fs.writeFileSync('./storeData.json', JSON.stringify(res), (err) => {
    if(err) console.log(0)
    else console.log(1)
})
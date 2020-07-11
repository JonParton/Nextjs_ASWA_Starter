
module.exports = async function (context, req) {

    const manualsData = require("./manualsData.json")

    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));

    var manual = {}
    var manualExists = false

    if (name)
    {
        manual = manualsData.find(manual => manual.name === name)

        if (manual) {
            manualExists = true;
        }

    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            manualExists:manualExists,
            manual:[
                manual
            ]            
        }
    };
}

module.exports = async function (context, req) {

    const manualsData = require("../utils/manualsData.json")

    context.log('JavaScript HTTP trigger function processed a request.');

    var manuals = {}
    var manualsExist = false

    // Get our JSON Manuals to return.
    manuals = manualsData

    // Check if there were any. 
    if (manuals) {
        manualsExist = true;
    }

    // Return our Manuals. 
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            manualsExist:manualsExist,
            manuals:manuals     
        }
    };
}
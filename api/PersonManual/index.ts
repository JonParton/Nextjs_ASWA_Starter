import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import manualsData from "../utils/manualsData.json"

export interface Manual {
id:                       string;
name:                     string;
description:              string;
answerToTheMeaningOfLife: string;
}

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    let name = <String>(req.query.name || (req.body && req.body.name));
    
    let manuals = <Manual[]>manualsData
    let numberOfRecords = 0
    let manual = <Manual>{}

    await sleep(2000);

    // Check if we got passed a name parameter
    if (name)
    {
        // See if we can find a manual with this name. 
        manual = manuals.find(manual => manual.name.toLowerCase() === name.toLowerCase())
        if (manual)
        {
            manuals = [manual]
            numberOfRecords = 1
        }
        else
        {
            manuals = []
        }
    }
    else
    {
        if (manuals && manuals.length > 0) {
            numberOfRecords = manuals.length
        }
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body:   {
            numberOfRecords:numberOfRecords,
            manuals:manuals
        }
    };

};

export default httpTrigger;
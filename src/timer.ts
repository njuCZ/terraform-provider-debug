import {getPidByName} from './processUtils'
import * as settingUtils from "./settingUtils";

export function listenLocalProcessPeriodly(){
    var timesRun = 0;
    var interval = setInterval(async function(){
        timesRun += settingUtils.getListenInterval();

        await getPidByName(settingUtils.getProcessName(), interval)

        if(timesRun >= settingUtils.getTotalListenTime()){
            console.log("stop listen. timesRun:" + timesRun)
            clearInterval(interval);
        }
    }, 1000)
}
